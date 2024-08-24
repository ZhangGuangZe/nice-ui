<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
// import Test from './components/Test.tsx'
import NiButton from './components/button/src/button.tsx'
</script>

<template>
  <HelloWorld msg="Vite + Vue" />

  <NiButton>button</NiButton>
  <ni-button type="primary">primary</ni-button>
  <!-- <Test /> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
