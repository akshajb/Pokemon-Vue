<template>
<div class='footer'>
  <footer>
    <p>@AkshajBalaji - 2020</p>
  </footer>
</div>
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
  .footer {
    position: fixed;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
