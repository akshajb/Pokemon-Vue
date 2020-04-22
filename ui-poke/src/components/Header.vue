<template>
  <header>
    <h1>Pokémon</h1>
  </header>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped>
  header{
    padding: 2rem;
  }
  h1{
    font-size: 5rem;
  }
</style>
