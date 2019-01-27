const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const {Player}= require('../models/players');

/* get all players handler */ 
const getAllPlayers = async (req,res)=>{
    try {
        const result = await Player.find({});
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/* get one player handler */
const getOnePlayer = async(req,res)=>{
    try {
      const result = await Player.findById(req.params.id);
      if(!result) throw new Error("no player was found");
      res.status(200).send(result); 
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/* add new player */ 

const addPlayer = async(req,res)=>{
    try {
    const {name , age ,price } = req.body ;
    const player = new Player({
        name ,
        age,
        price
    });
    await player.save();
    res.send("player added ");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/* update player */ 
const updatePlayer = async (req,res)=>{
    try {
        const updatedData = req.body ;
        if(Object.keys(updatedData).length < 1 )throw new Error ("no data to update");
        const result = await Player.findById(req.params.id);
        if(!result) throw new Error("no player was found");
        await Player.findByIdAndUpdate({_id:req.params.id},updatedData);
        res.status(200).send("player update done");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deletePlayer = async(req,res)=>{
    try {
        const result = await Player.findById(req.params.id);
        if(!result) throw new Error("no player was found");
        await Player.findByIdAndRemove(req.params.id);
        res.status(200).send("player deleted");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.getAllPlayers=getAllPlayers;
exports.getOnePlayer=getOnePlayer;
exports.addPlayer=addPlayer;
exports.updatePlayer=updatePlayer;
exports.deletePlayer=deletePlayer;
