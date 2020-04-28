<template>  
<li data-aos="fade-in">
    <h4>{{item['pokemon_species'].name}}</h4>
    <img class="sprite" v-bind:src="spriteSrc+item['pokemon_species'].name+'.gif'" />
</li>
</template>
<script>
export default {
    name: 'ListItem',
    props: {
      item: {
        type: Object
      },
      spriteSrc: {
        type: String  
      }
    }
}
</script>  

<style scoped>
ul {
  text-align: left;
  padding: 0.5rem;
}

li {
  display: flex;
  justify-content: space-evenly;
  padding: 0.5rem;
  text-transform: capitalize;
  list-style: none;
  list-style-position: inside;
  transition: all 1s ease-in-out;
  width: 80%;
  margin: 0 auto;
}

li h4 {
  align-self: center;
}

.sprite  {
  width: 50px;
  height: 50px;
}

.default {
  background-color: inherit;
}

li:nth-child(n) {
  background-color: #2c3e50;
  color: white;
}

li:hover {
  transform: scale(1.04) !important;
}
</style>