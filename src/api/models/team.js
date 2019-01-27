const mongoose = require('mongoose');
const Schema = mongoose.Schema ;
const model = mongoose.model;
const ObjectId = mongoose.Types.ObjectId;

const teamSchema = new Schema({
    name : {
        type : String ,
        required : true ,
        minlength : 3 ,
        maxlength : 255 ,
        default : "unnamed team"
    },
    nickname : {
        type : String ,
        minlength : 3 ,
        maxlength : 20 ,
        default : "unnamed team"
    },
    image : {
        type : String,
        default:"/////pic/////"
    },
    players : [{type:ObjectId,ref :'Player'}]
},{timestamps:true});

const Team = model ('Team' , teamSchema);
exports.Team=Team;