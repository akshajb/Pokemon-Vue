const Pokedex = require('pokedex-promise-v2');
var poke = new Pokedex();


class Pokemon{

    static getPokemonByName(name) {

        return  poke.getPokemonByName(name)
    
    }

}


module.exports = Pokemon