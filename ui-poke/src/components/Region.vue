<template>
<div class="region main">
    <div class="region-header">
      <h2>Select a Region</h2>
    </div>
    <div class="region-select">
      <div class="box" v-bind:class="{active: index === activeItem}" v-on:click="selectRegion(item.name,index); makeActive(index)" v-for="(item,index) in pokedexList" v-bind:key="index">
          <h5>{{item.name}}</h5>
      </div>
    </div>
    <div class="pokedex" v-show="regionClick">
      <ul>
        <router-link v-for="(item,index) in pokemons" v-bind:key="index" v-bind:to="'/pokemon/'+item['pokemon_species'].name">
          <li data-aos="fade-in">
            <h4>{{item['pokemon_species'].name}}</h4>
            <img class="sprite" v-bind:src="spriteSrc+item['pokemon_species'].name+'.gif'" />
          </li>
        </router-link>
      </ul>
    </div>
</div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';
const config = require('../config');
const axios = require('axios');


export default {

  data(){
    return{
    
      pokedexList: [],
      regionClick: false,
      pokedex: {},
      pokemons: [],
      spriteSrc: `${config.spriteSrc}`,
      activeClass: 'active',
      defaultClass: 'default',
      activeItem: null

    }
  },

  created(){
    AOS.init();
    axios.get(`${config.apiSrc}/pokedex-list`)
    .then(response=>{
      this.pokedexList = response.data;
    })
    .catch(error=>{
      console.log(error)
    })
    .finally(function(){
      console.log('pokedex-list call done')
    })
  },

  methods: {
    makeActive: function(i){
      this.activeItem = i;
    },
    selectRegion: function(region){
      axios.get(`${config.apiSrc}/pokedex/${region}`)
      .then(response=>{
        console.log(response.data)
        this.pokedex = response.data;
        this.regionClick = true;
        this.pokemons = this.pokedex['pokemons'].slice(0,20)
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
.region {
  margin: 0 auto;
  text-align: center;
}

.region-select{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 1rem;
}
.box {
  padding: 0.5rem 1.5rem;
  margin: 1rem;
  cursor: pointer;
  text-transform: capitalize;
  transition: all 350ms ease-in-out;
}

.box:hover{
  background-color: #2c3e50;
  color: white;
  transform: scale(1.1);
}

.pokedex ul {
  text-align: left;
  padding: 0.5rem;
}

.pokedex li {
  display: flex;
  justify-content: space-evenly;
  padding: 0.5rem;
  text-transform: capitalize;
  list-style: none;
  list-style-position: inside;
  transition: all 1s ease-in-out;
}

.pokedex  li h4 {
  align-self: center;
}

.pokedex .sprite  {
  width: 50px;
  height: 50px;
}

.default {
  background-color: inherit;
}

.pokedex li:nth-child(n) {
  background-color: #2c3e50;
  color: white;
}

.pokedex li:hover {
  transform: scale(1.1);
}
</style>
