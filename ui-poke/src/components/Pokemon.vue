<template>
<vue-page-transition name="fade-in-down">
  <div class='pokemon' v-show="loaded">
    <div class="image">
      <img v-bind:src="imageSrc+pokemon.id+'.svg'" v-on:load="onload()"/> 
    </div>
    <div class="info">
      <p><span>Name : {{pokemon.name}}</span></p>
      <p><span>Type : {{pokemon.type}}</span></p>
      <p><span>Abilities : {{pokemon.abilities}}</span></p>
      <p><span>Stats : {{pokemon.stats}}</span></p>
    </div>
  </div>
</vue-page-transition> 
</template>
<script>
const axios = require('axios');
const config = require('../config');

export default {
  
  data(){
    return {
      name: this.$route.params.name,
      pokemon: {},
      imageSrc: `${config.imageSrc}`,
      loaded: false
    }
  },
  methods: {
    onload: function() {
      this.loaded = true;
    }
  },
  created(){
    axios.get(`${config.apiSrc}/pokemon/${this.name}`)
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
</script>

<style scoped>
  .pokemon {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    max-width: 960px;
    margin: 2rem auto;
    padding: 2rem;
    box-shadow: rgba(49, 49, 49, 0.15) 20px 30px 50px;
  }

  .image img {
    max-height: 90%;
    width: 280px;
  }

  .info {
    flex-basis: 50%;
    /* background: #2c3e50; */
    color: #2c3e50;
    font-weight: 400;
  }
</style>
