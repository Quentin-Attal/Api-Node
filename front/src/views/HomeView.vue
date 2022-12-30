<script setup lang="ts">

import HelloWorld from '@/components/HelloWorld.vue';

let numbOpen = parseInt(localStorage.getItem("numbOpen") ?? "0");

localStorage.setItem('numbOpen', (++numbOpen).toString())


</script>

<template>
  <main>
    <HelloWorld :msg="numbOpen" />
  </main>
</template>
