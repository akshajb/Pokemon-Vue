<template>
  <div id="app" v-bind:style="colorCode">
    <Header></Header>
    <vue-page-transition name="fade-in-down">
      <router-view :pokedexs="pokedexs" :textColor="textColor" />
    </vue-page-transition> 
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
const axios = require('axios');
const config = require('./config');

var gen = require('color-generator');

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  props: {
    
  },
  data() {
    return {
      pokedexs: [],
      textColor: ''
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
  created() {
    axios.get(`${config.apiSrc}/`)
    .then(response=>{
      console.log(response.data)
      this.pokedexs = response.data;  
    })
    .catch(error=>{
      console.log(error)
    })
    .finally(function(){
      console.log('all pokedex call done') 
    })
    this.textColor = document.getElementById('app').style.backgroundColor
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  min-width: 100vw;
  min-height: 100vh;
  overflow: auto;
}
.active {
  background-color: #2c3e50;
  color: white;
  transform: scale(1.1);
}

.main {
  max-width: 960px;
  margin: 0 auto;
}

a{
  text-decoration: none;
  color: unset;
}

</style>
