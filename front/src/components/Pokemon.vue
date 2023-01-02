<script setup lang="ts">

import router from '@/router';
import { authStore } from '@/store/auth';
import { onMounted, ref } from 'vue';

const auth = authStore();
let classCol = ref("col-3")

const props = defineProps<{
    pokemonData: {
        id: string,
        name: string
    }
}>()

const redirection = () => {
    if (auth.status.loggedIn) {
        router.push("/pokemons/" + props.pokemonData.id)
    }
}

const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokemonData.id}.png`

onMounted(() => {
    changeClass()
    window.addEventListener('resize', changeClass, { passive: true })
})

const changeClass = () => {
    classCol.value = window.innerWidth < 800 ? window.innerWidth < 500 ? 'col-12' : 'col-5' : 'col-3'
}
</script>

<template>
    <button @click="redirection" :style="{cursor:auth.status.loggedIn ? 'pointer': 'default' }" :class="classCol"
        class="d-flex align-items-center flex-column text-center bg-transparent border-0">
        <img :src="imageUrl" height="96" width="96" style="aspect-ratio: 1; height: auto;" />
        <p class="fs-3 text-white">{{ props.pokemonData.name }}</p>
    </button>
</template>