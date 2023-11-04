const express = require('express');
const{ httpgetAllLaunches, httpaddNewLaunche, httpAbortLaunch } = require('./launches.controller');
const launchesrouter = express.Router();

launchesrouter.get('/', httpgetAllLaunches);
launchesrouter.post('/', httpaddNewLaunche);
launchesrouter.delete('/:id', httpAbortLaunch)
module.exports = launchesrouter;
