<template>
  <header class='header'>
    <h1>Pokémon</h1>
    <div class="nav">
      <ul>
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

  data(){
    return {
      activeItem: 0,
      navbarItems: ['Home', 'Region', 'About'],
      navbarLinks: ['/','/region','/about']
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
  .header{
    padding: 1rem;
    max-width: 960px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  h1{
    font-size: 3rem;
  }

  .nav {
    display: flex;
    width: 40%;
    align-items: center;
  }

  .nav ul{
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
  
  .nav li {
    padding: 0.5rem 1.5rem;
    list-style-type: none;
    cursor: pointer;
    color: #2c3e50;
    transition: all 200ms ease-in;
  }

  .nav li:hover {
    background-color: #2c3e50;
    color: white;
    transform: scale(1.1);
  }

  .router-link-active {
    background-color: #2c3e50;
    transform: scale(1.1);
  }

  .router-link-active li {
    color: #fff;
  }

</style>
