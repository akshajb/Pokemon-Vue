<template>
<div class="home main">
    <div class="search">
        <div class="search-box">
            <input type="text" v-model="search" placeholder="Search Pokémon">
            <button class="search-submit" v-on:keydown.enter="searchPokemon()" v-on:click.prevent="searchPokemon()">Search</button>
        </div>
        <div class="sub-text">
            <p>Any pokemon from Kanto, Johto, Hoen and Sinnoh</p>
        </div>
    </div>
    <div class="search-result">
        <div class="pokemon">
        {{pokemon}}
        </div>
        <div class="image">
            <router-link v-bind:to="'/pokemon/'+pokemon.name">
                <img v-bind:src="spriteSrc+pokemon.name+'.gif'" /> 
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
const axios = require('axios');
const config = require('../config');

export default {
  data() {
      return {
        search: "",
        pokemon: {},
        spriteSrc: `${config.spriteSrc}`
      }
  },
  methods: {
    searchPokemon: function(){
        axios.get(`${config.apiSrc}/pokemon/${this.search}`)
        .then(response=>{
            console.log(response.data)
            this.pokemon = response.data;
        })
        .catch(error=>{
            console.log(error)
        })
        .finally(function(){
            console.log('pokedex call done') 
        })
    }
  }
}
</script>

<style scoped>
    
.search {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 6rem;
}
.search-box {
    display: flex;  
    justify-content: center;
    margin-top: 1rem;
}
.search-box input[type="text"] {
    position: relative;
    font-size: 1rem;
    border: solid 1px #2c3e50;
    background-color: transparent;
    width: 33%;
    margin: 0 1rem;
    padding: 0.5rem;
}
.search-submit {
    font-family: 'Fira Sans', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: #fff;
    background: #2c3e50;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
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

.search-box input:focus::placeholder {
    opacity: 0;
}

.sub-text{
    text-align: center;
    font-size: 0.8rem
}
</style>
