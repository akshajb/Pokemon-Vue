<template>
<div class="home main">
    <div class="search">
        <div class="search-box">
            <div>
                <input type="text" v-model="search" placeholder="Search Pokémon"  v-on:keydown.enter="searchPokemon($event)">
                <vue-page-transition name="fade-in-down">
                    <div class="search-suggestions" v-if="search.length > 2 && filteredPokemon.length>0 ">
                        <ul>
                            <li v-for="(poke,i) in filteredPokemon" v-bind:key="i" :style="{'border-color':textColor}" v-on:click.prevent="searchPokemon(poke['pokemon_species'].name)">
                                {{poke['pokemon_species'].name}}
                            </li>
                        </ul>
                    </div>
                </vue-page-transition>
            </div>
            <button class="search-submit">Search</button>
        </div>
        <!-- <div class="sub-text">
            <p>Any pokemon from Kanto, Johto, Hoen and Sinnoh</p>
        </div> -->
    </div>
    <div class="search-result" v-if="retrieved=='searched'">
        <div class="image">
            <img class="sprite" v-bind:src="spriteSrc+pokemon.name+'.gif'" />
        </div>
        <div class="info">
            <p><span class="stats"><h3>Name :</h3> <ul><li><span>{{pokemon.name}}</span></li></ul></span></p>
            <p><span class="stats"><h3>Type :</h3> <ul><li v-for="(type,index) in pokemon.type" v-bind:key="index"><span>{{type}}</span></li></ul></span></p>
        </div>
        <div class="more">
            <router-link v-bind:to="'/pokemon/'+pokemon.name">
                <font-awesome-icon class="icon" v-bind:icon="['fas','plus-circle']" size="2x" />
            </router-link>
        </div>
    </div>
    <div class="loading" v-if="retrieved=='searching'">
      <font-awesome-icon v-bind:icon="['fas','spinner']" size="10x" pulse />
    </div>
</div>
</template>

<script>
const axios = require('axios');
const config = require('../config');

export default { 
    props: {
        pokedexs: {
            type: Array
        }
    },
    mounted(){
        this.textColor = document.getElementById('app').style.backgroundColor
    },
    data() {
        return {
            search: "",
            pokemon: {},
            spriteSrc: `${config.spriteSrc}`,
            retrieved: 'noSearch',
            textColor: ''
        }
    },
    methods: {
        searchPokemon: function(value){
            this.search = ''
            this.retrieved='searching'
            axios.get(`${config.apiSrc}/pokemon/${value}`)
            .then(response=>{
                console.log(response.data)
                this.pokemon = response.data;
                this.retrieved = 'searched';
            })
            .catch(error=>{
                console.log(error)
            })
            .finally(function(){
                console.log('pokedex call done') 
            })
        }
  },
    computed: {
        filteredPokemon : function() {
            var allPokemons = [];
            this.pokedexs.forEach(pokedex => {
                allPokemons = allPokemons.concat(pokedex.pokemons);
            })
            const result = allPokemons.filter(pokemon => pokemon['pokemon_species'].name.match(this.search))
            return result
        }
    }
}
</script>

<style scoped>
.main {
    height: 400px;
}
.home {
    display: flex;
    flex-direction: column;
}
.search {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}
.search-box {
    display: flex;  
    justify-content: flex-end;
    margin-top: 1rem;
    align-self: stretch;
    height: 0px;
}
.search-box input[type="text"] {
    position: relative;
    font-size: 1rem;
    border: solid 1px #2c3e50;
    background-color: transparent;
    /* width: 33%; */
    margin: 0 1rem;
    padding: 0.5rem;
    transition: all 500ms ease-in-out;
}
.search-submit {
    font-family: 'Fira Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    color: #fff;
    background: #2c3e50;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    width: max-content;
    height: fit-content;
}

.search-submit:hover {
    transform: scale(1.1)
}

.search-box input::placeholder {
    color: black;
    opacity: 0.8;
    padding: 0.5rem;
    position:relative;
    transition: all 0.5s;
}

.search-box input:focus {
    background: #2c3e50;
    color: #fff;
    outline: none;
}

.search-box input:focus::placeholder {
    opacity: 0;
}

.sub-text{
    text-align: center;
    font-size: 0.8rem
}

.search-suggestions {
    justify-content: center;
    padding: 1rem;
    height: 200px;
    overflow: auto;
}

.search-suggestions li {
    list-style-type: none;
    text-transform: capitalize;
    border: 0.5px solid  rgba(49, 49, 49, 0.15);
    padding: 0.5rem;
    background-color: #2c3e50 ;
    color: #fff;
    cursor: pointer;
}

.loading {
    align-self: center;
    margin: 2rem;
}

.search-result {
    display: flex;
    height: 50%;
    align-items: center;
    color: #2c3e50;
    justify-content: space-evenly;
    width: 50%;
    margin: auto;
    box-shadow: rgba(49, 49, 49, 0.15) 20px 30px 50px;
}
.info p {
    margin: 1rem
}

.image img {
    width: 80px;
}
.stats {
    display:flex;
    justify-content: space-between;
}
.stats h3 {
    align-self: center;
}
.stats ul {
    width: 70%;
}
.info li {
    list-style-type: none;
    width: 200px;
    text-transform: capitalize;
    border: 0.5px solid  rgba(49, 49, 49, 0.15);
    padding: 0.5rem;
    background-color: #2c3e50 ;
    color: #fff;
}

.icon {
    opacity: 0.5;
    transition: all 0.3s ease-in-out
}

.icon:hover {
    opacity: 1;
    transform: scale(1.1)
}
</style>
