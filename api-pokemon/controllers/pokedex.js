const Pokedex = require('../models/Pokedex')

exports.getpokedexslist = (req,res) => {
    const response = Pokedex.getPokedexsList()

    response.then(response =>{
        const data = [];
        for (let index = 1; index < 5; index++) {
            data.push(response.results[index]);
        }
        res.send(data)
    }).catch(error =>{
        res.send(error)
    })
}

exports.getpokedexbyname = (req,res) => {
    const response = Pokedex.getPokedexByName(req.params.name)

    response.then(data =>{
        res.send({
            name: data.name,
            pokemons: data.pokemon_entries
        })
    }).catch(error =>{
        res.send(error)
    })
}

exports.getallpokedex = (req,res) => {
    const response = Pokedex.getPokedexsList()
    var response2;
    var data = [];
    response.then(response =>{
        for (let index = 1; index < 5; index++) {
            response2 = Pokedex.getPokedexByName(response.results[index].name)
            response2.then(rawdata => {
                data.push({
                    name: rawdata.name,
                    pokemons: rawdata.pokemon_entries
                })
                if(index===4){
                    res.send(data)
                }
            })
        }
    }).catch(error =>{
        res.send(error)
    })

    
}