<script setup lang="ts">
  import Footer from './components/Footer.vue'
  import Header from './components/Header.vue'
</script>

<template>
  <div class="wrapper">
    <Header />
    <main>
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
  .wrapper {
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
  }
</style>
