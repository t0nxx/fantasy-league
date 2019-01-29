const mongoose = require('mongoose');
const {User}= require('../models/user');
const {validIdObject}=require('../helpers/validateObjectId');

/* get all Users handler */ 
const getAllUsers = async (req,res)=>{
    try {
        const result = await User.find({});
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/* get one User handler */
const getOneUser = async(req,res)=>{
    try {
       /* validate id is mongo objectType */
        validIdObject(req.params.id);

      const result = await User.findById(req.params.id).populate('players','name totaPoints price');
      if(!result) throw new Error("no User was found");
      res.status(200).send(result); 
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/* add new User */ 

const addUser = async(req,res)=>{
    try {
    const {name , email , password , players } = req.body ;
    const user = new User({
        name ,
        password,
        email,
        players
    });
    await user.save();
    res.status(200).send("User added ");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/* update User */ 
const updateUser = async (req,res)=>{
    try {
        /* validate id is mongo objectType */
        validIdObject(req.params.id);

        const updatedData = req.body ;
        if(Object.keys(updatedData).length < 1 )throw new Error ("no data to update");
        const result = await User.findById(req.params.id);
        if(!result) throw new Error("no User was found");
        await User.findByIdAndUpdate({_id:req.params.id},updatedData);
        res.status(200).send("User update done");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteUser = async(req,res)=>{
    try {
        /* validate id is mongo objectType */
        validIdObject(req.params.id);

        const result = await User.findById(req.params.id);
        if(!result) throw new Error("no User was found");
        await User.findByIdAndRemove(req.params.id);
        res.status(200).send("User deleted");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.getAllUsers=getAllUsers;
exports.getOneUser=getOneUser;
exports.addUser=addUser;
exports.updateUser=updateUser;
exports.deleteUser=deleteUser;