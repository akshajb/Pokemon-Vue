<template>
  <div id="app" v-bind:style="colorCode">
    <Header></Header>
    <div class="content">
      <div class="region-select">
        <div class="box" v-bind:class="{active: index === activeItem}" v-on:click="selectRegion(item.name,index)" v-for="(item,index) in pokedexList" v-bind:key="index">
          <h3>{{item.name}}</h3>
        </div>
      </div>
      <div class="pokedex" v-show="regionClick">
        <ul>
          <li v-for="(item,index) in pokemons" v-bind:key="index" data-aos="fade-in">
            <h4>{{item['pokemon_species'].name}}</h4>
            <img class="sprite" v-bind:src="spriteSrc+item['pokemon_species'].name+'.gif'" />
          <!-- <img class="vector" v-bind:src="imageSrc+item['entry_number']+'.svg'" />  -->
          </li>
        </ul>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import AOS from 'aos';
import 'aos/dist/aos.css';
const config = require('./config');
const axios = require('axios');
var gen = require('color-generator');

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  props: {
    
  },
  data: function(){
    return {
      pokedexList: [],
      regionClick: false,
      pokedex: {},
      pokemons: [],
      imageSrc: `${config.imageSrc}`,
      spriteSrc: `${config.spriteSrc}`,
      activeClass: 'active',
      defaultClass: 'default',
      activeItem: null
    }
  },
  methods: {
    selectRegion: function(region, i){
      this.activeItem = i;
      // this.regionClick = !this.regionClick;
      axios.get(`${config.apiSrc}/pokedex/${region}`)
      .then(response=>{
        console.log(response.data)
        this.pokedex = response.data;
        this.regionClick = true;
        this.pokemons = this.pokedex['pokemons'].slice(5,20)
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
    colorCode : function(){
      var color = gen().hexString();
      var sat = gen(0.8, 0.25).hexString()
      console.log(sat)
      return{
        'background-color': color,
        'border': `1px solid ${color}`,
      }
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
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 100vw;
  min-height: 100vh;
  overflow: auto;
}

.content {
  max-width: 960px;
  margin: 0 auto;
}

.region-select{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.box {
  flex-basis: 20%;
  padding: 1rem;
  margin: 1rem;
  cursor: pointer;
  text-transform: capitalize;
  transition: all 350ms ease-in-out;
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

.box:hover, .active {
  background-color: #2c3e50;
  color: white;
  transform: scale(1.1);
}

.pokedex li:nth-child(n) {
  background-color: #2c3e50;
  color: white;
}


</style>
