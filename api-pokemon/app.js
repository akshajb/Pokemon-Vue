require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;


var Pokedex = require('pokedex-promise-v2');
var poke = new Pokedex();

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/region-list',(req,res)=>{
    poke.getRegionsList()
    .then(response=>{
        res.send(response);
    })
    .catch(error=>{
        res.send(error);
    })
})



var server = app.listen(port, function () {
    console.log(`Listening on ${port}`) 
});
