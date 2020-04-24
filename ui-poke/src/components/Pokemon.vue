<template>
<div class='pokemon'>
  <div class="info">
    {{pokemon}}
  </div>
  <div class="image">
    <img v-bind:src="imageSrc+pokemon.id+'.svg'" /> 
  </div>
</div>
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
  
</style>
