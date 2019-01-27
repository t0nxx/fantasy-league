const express = require('express');
const mongoose = require('mongoose');
const app  = express();
require('dotenv').config();
mongoose.connect('mongodb://localhost:27017/fantasypl', {useNewUrlParser: true})
.then(console.log('connected to db')).catch(console.log());

app.use(express.json());
app.get('/' , (req,res) => {
    res.status(200).send("ok it's run");
});
app.listen(process.env.PORT,()=> console.log(`running on http://localhost:${process.env.PORT}`));
