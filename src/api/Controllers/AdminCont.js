const mongoose = require('mongoose');
const {Admin}= require('../models/admin');
const {validIdObject}=require('../helpers/validateObjectId');
const bcrypt = require('bcryptjs');

/* get all Admins handler */ 
const getAllAdmins = async (req,res)=>{
    try {
        const result = await Admin.find({});
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/* get one Admin handler */
const getOneAdmin = async(req,res)=>{
    try {
       /* validate id is mongo objectType */
        validIdObject(req.params.id);

      const result = await Admin.findById(req.params.id);
      if(!result) throw new Error("no Admin was found");
      res.status(200).send(result); 
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/* add new Admin */ 

const addAdmin = async(req,res)=>{
    try {
    const {name , email , password } = req.body ;
    const admin = new Admin({
        name ,
        password,
        email,
    });
    await admin.save();
    res.status(200).send("Admin added ");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/* update Admin */ 
const updateAdmin = async (req,res)=>{
    try {
        /* validate id is mongo objectType */
        validIdObject(req.params.id);

        const updatedData = req.body ;
        if(Object.keys(updatedData).length < 1 )throw new Error ("no data to update");
        const result = await Admin.findById(req.params.id);
        if(!result) throw new Error("no Admin was found");
        /* check if new pass cause mongoose pre update is fkin sh*t */
        if (updatedData.password) {
            if(updatedData.password.length < 6){
                throw new Error ("password length not less than 6");
            }
           updatedData.password = await bcrypt.hashSync(updatedData.password,10);
        }
        ////////
        await Admin.findByIdAndUpdate({_id:req.params.id},updatedData,{runValidators : true});
        res.status(200).send("Admin update done");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteAdmin = async(req,res)=>{
    try {
        /* validate id is mongo objectType */
        validIdObject(req.params.id);

        const result = await Admin.findById(req.params.id);
        if(!result) throw new Error("no Admin was found");
        await Admin.findByIdAndRemove(req.params.id);
        res.status(200).send("Admin deleted");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.getAllAdmins=getAllAdmins;
exports.getOneAdmin=getOneAdmin;
exports.addAdmin=addAdmin;
exports.updateAdmin=updateAdmin;
exports.deleteAdmin=deleteAdmin;