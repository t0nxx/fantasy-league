const {app} = require('../../server');
const mongoose = require('mongoose');
const request = require('supertest');
require('dotenv').config();

beforeAll(async()=>{
    mongoose.connect('mongodb://localhost:27017/fantasypl', {useNewUrlParser: true})
    serv = app.listen(4000); 
    server = request.agent(serv); 
})
describe('GET All /players',()=>{
    test('it should return array of players',async()=>{
        const res = await server.get('/players');
        expect(res.status).toBe(200);
    })
})

afterAll(async()=>{
    if (serv) await serv.close();
    mongoose.connections.forEach(async con => await con.close());
})
