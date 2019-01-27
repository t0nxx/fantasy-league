const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const validIdObject = (id)=>{
    if (!ObjectId.isValid(id.toString())) throw new Error ("Invalid id");
}

exports.validIdObject=validIdObject;