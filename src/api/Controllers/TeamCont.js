const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const {Team}= require('../models/team');

/* get all Teams handler */ 
const getAllTeams = async (req,res)=>{
    try {
        const result = await Team.find({});
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/* get one Team handler */
const getOneTeam = async(req,res)=>{
    try {
      const result = await Team.findById(req.params.id).populate('players','name');
      if(!result) throw new Error("no Team was found");
      res.status(200).send(result); 
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/* add new Team */ 

const addTeam = async(req,res)=>{
    try {
    const {name , nickname , image , players } = req.body ;
    const team = new Team({
        name ,
        nickname,
        image,
        players
    });
    await team.save();
    res.send("Team added ");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/* update Team */ 
const updateTeam = async (req,res)=>{
    try {
        const updatedData = req.body ;
        if(Object.keys(updatedData).length < 1 )throw new Error ("no data to update");
        const result = await Team.findById(req.params.id);
        if(!result) throw new Error("no Team was found");
        await Team.findByIdAndUpdate({_id:req.params.id},updatedData);
        res.status(200).send("Team update done");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteTeam = async(req,res)=>{
    try {
        const result = await Team.findById(req.params.id);
        if(!result) throw new Error("no Team was found");
        await Team.findByIdAndRemove(req.params.id);
        res.status(200).send("Team deleted");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.getAllTeams=getAllTeams;
exports.getOneTeam=getOneTeam;
exports.addTeam=addTeam;
exports.updateTeam=updateTeam;
exports.deleteTeam=deleteTeam;
