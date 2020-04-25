<template>
<div class="home main">
    <div class="search">
        <div class="search-box">
            <input type="text" v-model="search" placeholder="Search Pokémon" v-on:keydown.enter="searchPokemon()">
            <button class="search-submit" v-on:click.prevent="searchPokemon()">Search</button>
        </div>
        <div class="sub-text">
            <p>Any pokemon from Kanto, Johto, Hoen and Sinnoh</p>
        </div>
    </div>
    <div class="search-result" v-if="submitted">
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
        spriteSrc: `${config.spriteSrc}`,
        submitted: false
      }
  },
  methods: {
    searchPokemon: function(){
        axios.get(`${config.apiSrc}/pokemon/${this.search}`)
        .then(response=>{
            console.log(response.data)
            this.pokemon = response.data;
            this.submitted = true;
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
