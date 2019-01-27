const mongoose = require('mongoose');
const Schema = mongoose.Schema ;
const model = mongoose.model;
const playerSchema = new Schema({
    name : {
        type : String ,
        required : true ,
        minlength : 3 ,
        maxlength : 255
    },
    age : {
        type : Number ,
        required : true ,
        min : 16 ,
        max : 45
    },
    price :{
        type : Number,
        default : 5
    },
    numOfGoals : {
        type : Number ,
        default : 0 
    },
    numOfAssist : {
        type : Number ,
        default : 0 
    },
    totalBouns : {
        type : Number,
        default : 0
    },
    points : {
        type : [Number],
        default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        required:true
    },
    image : {
        type : String,
        default:"/////pic/////"
    }
},{timestamps:true});
const Player = model('Player',playerSchema);
exports.Player = Player ;