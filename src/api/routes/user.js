const express = require('express');
const router = express.Router();
const {getAllUsers,getOneUser,addUser,updateUser,deleteUser} = require('../Controllers/UserCont');


/*
* get all Users 
*/
router.get('/',getAllUsers);

/*
* get User
*/
router.get('/:id',getOneUser);
/*
* add User
*/
router.post('/add',addUser);
/*
* update User
*/
router.put('/:id',updateUser);
/*
* delete User
*/
router.delete('/:id',deleteUser);

exports.UserRouter=router;