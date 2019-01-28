const express = require('express');
const mongoose = require('mongoose');
const app  = express();
const {PlayerRouter} = require('./src/api/routes/player');
const {TeamRouter}= require('./src/api/routes/team');
require('dotenv').config();
app.use(express.json());
app.get('/' , (req,res) => {
    res.status(200).send("ok it's run");
});

app.use('/players',PlayerRouter);
app.use('/teams',TeamRouter);
exports.app = app ;
exports.mongoose = mongoose ;
/// i spearated app , mongoose con for comfort in testing ... 