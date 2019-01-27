const express = require('express');
const mongoose = require('mongoose');
const app  = express();
const {PlayerRouter} = require('./src/api/routes/player');
const {TeamRouter}= require('./src/api/routes/team');
require('dotenv').config();
mongoose.connect('mongodb://localhost:27017/fantasypl', {useNewUrlParser: true})
.then(console.log('connected to db')).catch(console.log());

app.use(express.json());
app.get('/' , (req,res) => {
    res.status(200).send("ok it's run");
});

app.use('/players',PlayerRouter);
app.use('/teams',TeamRouter);
app.listen(process.env.PORT,()=> console.log(`running on http://localhost:${process.env.PORT}`));