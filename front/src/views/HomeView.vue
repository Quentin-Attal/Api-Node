<script setup lang="ts">

import HelloWorld from '@/components/HelloWorld.vue';

let numbLogin = parseInt(localStorage.getItem("numbLogin") ?? "0");

localStorage.setItem('numbLogin', (++numbLogin).toString())


</script>

<template>
  <main>
    <HelloWorld />
  </main>
</template>
