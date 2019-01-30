const mongoose = require('mongoose');
const Schema = mongoose.Schema ;
const model = mongoose.model;
const ObjectId = Schema.Types.ObjectId ;
const bcrypt = require('bcryptjs');
const adminSchema = new Schema({
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
    isSuperAdmin :{
        type : Boolean ,
        default : false
    }
},{timestamps:true});
adminSchema.pre('save',async function(){    
/******dont ever use fkin arrow fun in pre ******/
    if(this.password && this.isModified('password')){
        this.password = await bcrypt.hashSync(this.password,10);
    }
    
})

/// don't forget to add pre update hook 

const Admin = model('Admin',adminSchema);
exports.Admin=Admin;
/// remeber to validate with joi 