<template>
<vue-page-transition name="fade-in-down">
  <div class="container">
    <div class='pokemon' v-show="loaded">
      <div class="image">
        <img ref="myImg" v-bind:src="imageSrc+pokemon.id+'.svg'" v-on:load="onload($event)"/> 
      </div>
      <div class="info">
        <h1>{{pokemon.name}}</h1>
        <p><span class="stats"><h3>Type :</h3> <ul><li v-for="(type,index) in pokemon.type" v-bind:key="index" :style="{'border-color':textColor}"> <span>{{type}}</span></li></ul></span></p>
        <p><span class="stats"><h3>Abilities :</h3> <ul><li v-for="(ability,index) in pokemon.abilities" v-bind:key="index" :style="{'border-color':textColor}"> <span>{{ability}}</span></li></ul></span></p>
        <p><span class="stats"><h3>Stats :</h3> <ul><li v-for="(stat,index) in pokemon.stats" v-bind:key="index" :style="{'border-color':textColor}"> <span>{{stat.name}}</span> <span>{{stat.base_stat}}</span></li></ul></span></p>
      </div>
    </div>
    <div class="loading" v-show="!loaded">
      <font-awesome-icon class="icon" v-bind:icon="['fas','spinner']" size="10x" pulse />
    </div>
  </div>
</vue-page-transition> 
</template>
<script>
const axios = require('axios');
const config = require('../config');

export default {
  props: {
    
  },
  data(){
    return {
      name: this.$route.params.name,
      pokemon: {},
      imageSrc: `${config.imageSrc}`,
      loaded: false,
      textColor: ''
    }
  },
  methods: {
    onload: function() {
      this.loaded = true;
      this.textColor = document.getElementById('app').style.backgroundColor
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
    });

  }

}
</script>

<style scoped>
  .pokemon, .loading {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    max-width: 960px;
    margin: 0;
    padding: 2rem;
    box-shadow: rgba(49, 49, 49, 0.15) 20px 30px 50px;
  }

  .image img {
    max-height: 90%;
    width: 180px;
  }

  .info {
    flex-basis: 50%;
    color: #2c3e50;
    font-weight: 700;
    align-self: center;
  }

  .info h1 {
    text-align: center;
    text-transform: capitalize;
  }

  .info p {
    margin: 1rem
  }

  .info li {
    display:flex;
    justify-content: space-between;
    list-style-type: none;
    width: 200px;
    text-transform: capitalize;
    border: 0.5px solid  rgba(49, 49, 49, 0.15);
    padding: 0.5rem;
    background-color: #2c3e50 ;
    color: #fff;
  }
  .loading {
    box-shadow: none;
  }

.stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
  }


 @media only screen and (min-width: 760px )  {
    
    .pokemon {
      flex-direction: row;
      margin: 2rem auto;
      flex-direction: row;
      font-size: 1rem;
    }

    .stats {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
    }

    .info {
      align-self: flex-start;
    }

    .image img {
      max-height: 90%;
      width: 280px;
    }

  }
</style>
