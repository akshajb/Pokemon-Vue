<template>
  <header class='header'>
    <router-link to="/" >
      <h1 v-on:click="hideSidebar()">Pokédex</h1>
    </router-link>
    <div class="nav">
      <ul>
        <router-link v-for="(item,index) in navbarItems" v-bind:key="index" v-bind:to="navbarLinks[index]" exact>
          <li>
            <h5>{{item}}</h5>
          </li> 
        </router-link>
      </ul>
    </div>
    <div class="burger-menu" v-on:click="showSidebar()">
      <font-awesome-icon v-bind:icon="['fas','bars']" size="2x" />
    </div>
    <div class="side-menu" :style="sideBarVisible" v-on:click="hideSidebar()">
      
      <ul>
        <li><font-awesome-icon  v-bind:icon="['fas','times-circle']" size="2x" /></li>
        <router-link v-for="(item,index) in navbarItems" v-bind:key="index" v-bind:to="navbarLinks[index]" exact>
          <li>
            <h5>{{item}}</h5>
          </li> 
        </router-link>
      </ul>

    </div>
  </header>
</template>

<script>

export default {
  props: {
    
  },
  created(){
    

  },
  data(){
    return {
      activeItem: 0,
      navbarItems: ['Region', 'About'],
      navbarLinks: ['/region','/about'],
    }
  },
  methods: {
    showSidebar(){
      
      this.$store.commit('showsidebar')

    },
    hideSidebar(){
      
      this.$store.commit('hidesidebar')

    }
  },
  computed: {
    sideBarVisible: function() {

      if(this.$store.state.sideBar){
        return{
          'left': '0'
        }
      }
      else {
        return {
          'left': '-50%'
        }
      }
    }
  }
}
</script>

<style scoped>
  .header{
    padding: 1rem;
    max-width: 960px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* flex-direction: column; */
  }

  .header>a {
    order: 1
  }

  h1{
    font-size: 2rem;
  }

  .nav {
    display: none;
    width: 40%;
    align-items: center;
  }

  .nav ul{
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }
  
  .nav li, .side-menu li {
    padding: 0.5rem 1.5rem;
    list-style-type: none;
    cursor: pointer;
    color: #2c3e50;
    transition: all 500ms ease-in-out;
  }

  .nav li:hover {
    background-color: #2c3e50;
    color: white;
    transform: scale(1.1);
  }

  .nav .router-link-active {
    background-color: #2c3e50;
    transform: scale(1.1);
  }

  .router-link-active li {
    color: #fff;
  }

  .burger-menu {
    display: block;
    order: -1;
  }

  .side-menu {
    position: fixed;
    top: 0%;
    left: -50%;
    height: 100%;
    width: 30%;
    background-color: #2c3e50;
    z-index: 2;
    transition: all 500ms linear;
  }

  .side-menu ul {
    display: flex;
    flex-direction: column;
    height: 30%;
    justify-content: space-evenly;
  }

  .side-menu li {
    color: white;
  }
  @media only screen and (min-width: 760px )  {
    
    .header {
      flex-direction: row;
      align-items: center;
    }

    h1 {
      font-size: 3rem;
    }
    .header>a {
      order: 0
    }
    .nav {
      display: flex;
      width: 40%;
      align-items: center;
    }
    .burger-menu {
      display: none;
    }
  }




</style>
