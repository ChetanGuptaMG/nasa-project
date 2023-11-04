const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const planetRouter =  require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.router');


const app = express();

app.use(cors({
    origin: '*',
}));
app.use(morgan('combined'));
app.use(express.json());
app.use('/planets',planetRouter);
app.use('/launches',launchesRouter);
app.use(express.static(path.join(__dirname,'..','public')));
app.get('/*',(req,res) =>{
    res.sendFile(path.join(__dirname,'..','public','index.html'));
})

module.exports = app;
