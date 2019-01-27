const express = require('express');
const router = express.Router();
const {getAllPlayers,getOnePlayer,addPlayer,updatePlayer,deletePlayer} = require('../Controllers/playerCont');


/*
* get all players 
*/
router.get('/',getAllPlayers);

/*
* get player
*/
router.get('/:id',getOnePlayer);
/*
* add player
*/
router.post('/add',addPlayer);
/*
* update player
*/
router.put('/:id',updatePlayer);
/*
* delete player
*/
router.delete('/:id',deletePlayer);

exports.PlayerRouter=router;