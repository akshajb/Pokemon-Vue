<template>
  <div id="app" v-bind:style="colorCode">
    <Header></Header>
    <vue-page-transition name="fade-in-down">
      <router-view/>
    </vue-page-transition> 
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

// import Region from './components/Region.vue'
var gen = require('color-generator');

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  props: {
    
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
