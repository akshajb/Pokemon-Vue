<template>
  <div id="app" v-bind:style="colorCode">
    <Header></Header>
    <vue-page-transition name="fade-in-down">
      <router-view  :textColor="textColor" />
    </vue-page-transition> 
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
// const axios = require('axios');
// const config = require('./config');

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
      textColor: ""
    }
  },
  methods: {
    
  },
  computed: {
    colorCode : function(){
      return{
        'background-color': this.textColor,
        'border': `1px solid ${this.textColor}`
      }
    }
  },
  created() {
    var color = gen().hexString();
    this.$store.dispatch('setpokedexs')
    this.$store.dispatch('setbackground', color)
  },
  mounted() {
    this.textColor = this.$store.state.bgcolor
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
