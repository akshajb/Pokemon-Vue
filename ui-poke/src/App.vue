<template>
  <div id="app">
    <Header></Header>
    <div class="content">
      <div class="region-select">
        <div class="box" v-on:click="selectRegion(item.name)" v-for="(item,index) in regionList" v-bind:key="index"><h2>{{item.name}}</h2></div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import axios from '../node_modules/axios'

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
      regionList: []
    }
  },
  methods: {
    selectRegion: function(region){
      console.log('Selected ',region)
    }
  },
  created(){
    axios.get('http://localhost:8000/region-list')
    .then(response=>{
      this.regionList = response.data.results;
    })
    .catch(error=>{
      console.log(error)
    })
    .finally(function(){
      console.log('populated regionList')
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  width: 960px;
}

.region-select{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.box {
  flex-basis: 20%;
  height: 200px;
  border: 1px solid grey;
  margin: 1rem;
  cursor: pointer;
  text-transform: capitalize;
  transition: all 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
}
.box:hover {
  background-color: #2c3e50;
  color: white;
}
</style>
