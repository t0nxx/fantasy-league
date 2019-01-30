const express = require('express');
const mongoose = require('mongoose');
const app  = express();
const cors = require('cors');
const {PlayerRouter} = require('./src/api/routes/player');
const {TeamRouter}= require('./src/api/routes/team');
const {UserRouter}= require('./src/api/routes/user');
const {AdminRouter}= require('./src/api/routes/admin');
const {TokenerRouter}= require('./src/api/routes/genToken');
require('dotenv').config();
app.use(express.json());
app.use(cors());
app.get('/' , (req,res) => {
    res.status(200).send("ok it's run");
});

app.use('/players',PlayerRouter);
app.use('/teams',TeamRouter);
app.use('/users',UserRouter);
app.use('/admins',AdminRouter);
app.use('/tokens',TokenerRouter);
exports.app = app ;
exports.mongoose = mongoose ;
/// i spearated app , mongoose con for comfort in testing ... 