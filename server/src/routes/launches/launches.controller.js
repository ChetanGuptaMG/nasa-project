const e = require('express');
const { getAllLaunches, scheduleNewlaunch, existsLaunchWithId, abortLaunchById } = require('../../models/launches.model');
const { pagination } = require('../../utils/query');

async function httpgetAllLaunches (req, res) {
    const { skip, limit } = pagination(req.query);
    const launches = await getAllLaunches(skip, limit);
    return res.status(200).json(launches);
}

async function httpaddNewLaunche(req, res) {
    const launch = req.body;
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: 'Missing required launch property',
        })
    }

    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error: 'invalid launchdate'
        });
    }
    await scheduleNewlaunch(launch);
    return res.status(201).json(launch);
}

async function httpAbortLaunch(req,res){
    const laundchId =Number(req.params.id);
    const existsLaunch = await existsLaunchWithId(laundchId);
    if(!existsLaunch){
        return res.status(400).json({
            error: 'launch not aborted'
        });
    }
    const aborted = await abortLaunchById(laundchId);
    if(!aborted){
        return res.status(400).json({
            error: 'launch not aborted'
        });
    }
    return res.status(200).json({
        ok: true,
    });
}

module.exports = {
    httpgetAllLaunches,
    httpaddNewLaunche,
    httpAbortLaunch,
}