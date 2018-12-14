<template>
<div>
  <TheNav></TheNav>
  <router-view></router-view>
</div>
</template>

<script>
import TheNav from '../../components/TheNav.vue';

export default {
  name: 'system',
  components: {
    TheNav,
  },
};
</script>

<style scoped>

</style>
