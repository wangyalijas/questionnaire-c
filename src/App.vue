<template>
  <div id="app">
    <!--<TheNav></TheNav>-->
    <router-view/>
  </div>
</template>

<script>

export default {
  components: {
  },
};
</script>
<style lang="scss">
  body {
    background: $--background-color-regular;
  }
  html,body{
    width: 100%;
    height: 100%;
    margin: 0;
  }
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
    width: 100%;
    height: 100%;
  }
</style>
