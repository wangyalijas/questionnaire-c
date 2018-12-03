<template>
  <div id="app">
    <TheNav></TheNav>
    <router-view/>
  </div>
</template>

<script>
import TheNav from './components/TheNav.vue';

export default {
  components: {
    TheNav,
  },
};
</script>
<style lang="scss">
  body {
    background: $--background-color-regular;
  }
</style>
