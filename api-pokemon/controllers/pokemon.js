const Pokemon = require('../models/Pokemon')

exports.getpokemonbyname = (req,res) => {
    const response = Pokemon.getPokemonByName(req.params.name)

    response.then(rawdata =>{
        var data = {};
        data['id'] = rawdata.id;
        data['name'] = rawdata.name;
        data['abilities'] = rawdata.abilities.map(element => {
            return element.ability.name
        });;
        data['type'] = rawdata.types.map(element => {
            return element.type.name
        }); 
        data['stats'] = rawdata.stats.map(element => {
            return {
                'name': element['stat']['name'],
                'base_stat': element['base_stat']
            }
        })
        res.send(data)
    }).catch(error =>{
        res.send(error)
    })
}