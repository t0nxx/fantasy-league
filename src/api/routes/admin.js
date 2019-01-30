const express = require('express');
const router = express.Router();
const {getAllAdmins,getOneAdmin,addAdmin,updateAdmin,deleteAdmin} = require('../Controllers/AdminCont');


/*
* get all Admins 
*/
router.get('/',getAllAdmins);

/*
* get Admin
*/
router.get('/:id',getOneAdmin);
/*
* add Admin
*/
router.post('/add',addAdmin);
/*
* update Admin
*/
router.put('/:id',updateAdmin);
/*
* delete Admin
*/
router.delete('/:id',deleteAdmin);

exports.AdminRouter=router;