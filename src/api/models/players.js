const mongoose = require('mongoose');
const Schema = mongoose.Schema ;
const model = mongoose.model;
const ObjectId = Schema.Types.ObjectId ;
const sumMethod = (num1,num2)=> num1 + num2 ;
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
        default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // 20 round 
        required:true
    },
    totaPoints :{
        type : Number,
    },
    image : {
        type : String,
        default:"/////pic/////"
    },
    team : {type:ObjectId , ref:'Team' , required : true} 
},{timestamps:true});

playerSchema.pre('save',async function(){
    this.totaPoints = await this.points.reduce(sumMethod);
})

const Player = model('Player',playerSchema);
exports.Player = Player ;