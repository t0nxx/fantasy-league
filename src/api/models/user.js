const mongoose = require('mongoose');
const Schema = mongoose.Schema ;
const model = mongoose.model;
const ObjectId = Schema.Types.ObjectId ;
const bcrypt = require('bcryptjs');
const {Player} = require('./players')

const userSchema = new Schema({
    name : {
        type : String ,
        required : true ,
        minlength : 3 ,
        maxlength : 255 ,
    },
    email : {
        type : String ,
        required : true,
        minlength : 6 ,
        maxlength : 255 ,
    },
    password :{
        type : String ,
        required : true ,
        minlength : 6 ,
        maxlength : 255 ,
    },
    isComfirmed : { /// will be indexed 
        type : Boolean ,
        default : false
    },
    confCode : {
        type : String ,
        default : Math.random().toString(36).substring(2)
    },
    resetCode : {
        type : String ,
        default : Math.random().toString(36).substring(2)
    },
    players : {
    type : [{type:ObjectId,ref :'Player'}],
    validate : [
        {validator : arrSize , msg : 'num of players must be 10'},
        {validator : notOverPrice , msg : 'sum of players not excced 100 m'}

    ],
    required : true
}
},{timestamps:true});
userSchema.pre('save',async function(){    
/******dont ever use fkin arrow fun in pre ******/
    if(this.password && this.isModified('password')){
        this.password = await bcrypt.hashSync(this.password,10);
    }
    
})
/// don't forget to add pre update hook 

const User = model('User',userSchema);

function arrSize (arr){
    return (arr.length == 10)
}
async function notOverPrice (arr){
    let sum = 0 ;
    const rez = await Player.find({_id : {$in : arr }}); 
     rez.forEach(player => {
        sum += player.price ;
    });
    return sum <= 100 ;
}
exports.User=User;

/// remeber to validate with joi 


/*["5c508f1053c9502543d3b448",
    "5c508f1153c9502543d3b449",
    "5c508f1253c9502543d3b44a",
    "5c508f1353c9502543d3b44b",
    "5c508f1353c9502543d3b44c",
    "5c508f1453c9502543d3b44d",
    "5c508f1553c9502543d3b44e",
    "5c508f1653c9502543d3b44f",
    "5c508f1853c9502543d3b450",
    "5c508f1a53c9502543d3b451"]
    "5c508f2753c9502543d3b452"
    */