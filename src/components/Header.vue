<script setup lang="ts">
</script>

<template>
  <header class="header">
    <div class="container-xxl">
      <RouterLink to="/" class="logo" aria-label="logo">
        <img class="logo-img" src="@/assets/logo.svg" alt="logo" />
      </RouterLink>
      <nav class="nav">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/about" class="nav-link">About</RouterLink>
        <RouterLink to="/time" class="nav-link">Time</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
    .container-xxl {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header {
        background-color: darkcyan;
        color: white;
        padding: 18px 0;
    }

    .logo {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
    }

    .logo-img {
        height: 50px;
    }

    .nav {
        display: flex;
        gap: 20px;
    }

    .nav-link {
        color: lightblue;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s;
    }

    .nav-link:hover {
        color: lightgreen;
    }

    .nav-link.active {
        color: green;
        font-weight: 700;
    }

    @media (max-width: 768px) {
        .header .container-xxl {
            flex-direction: column;
            gap: 10px;
        }
    }
</style>
