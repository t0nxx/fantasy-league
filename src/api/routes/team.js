const express = require('express');
const router = express.Router();
const {getAllTeams,getOneTeam,addTeam,updateTeam,deleteTeam} = require('../Controllers/TeamCont');


/*
* get all Teams 
*/
router.get('/',getAllTeams);

/*
* get Team
*/
router.get('/:id',getOneTeam);
/*
* add Team
*/
router.post('/add',addTeam);
/*
* update Team
*/
router.put('/:id',updateTeam);
/*
* delete Team
*/
router.delete('/:id',deleteTeam);

exports.TeamRouter=router;