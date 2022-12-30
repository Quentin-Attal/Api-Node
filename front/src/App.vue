<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="header">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <nav class="nav">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
.header {
  display: flex;
  align-items: flex-end;
}

.nav {
  margin-left: 6vw;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 2vw;
}

.logo {
  width: 6vw;
  aspect-ratio: 1 / 1;
  height: auto;
}
</style>
