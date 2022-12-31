<script setup lang="ts">

import router from '@/router';
import { authStore } from '@/store/auth';

const auth = authStore();

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

</script>

<template>
    <button @click="redirection" :style="{cursor:auth.status.loggedIn ? 'pointer': 'default' }"
        class="col-3 d-flex align-items-center flex-column text-center bg-transparent border-0">
        <img :src="imageUrl" height="96" width="96" class="w-50" style="aspect-ratio: 1; height: auto;" />
        <p class="fs-3 text-white">{{ props.pokemonData.name }}</p>
    </button>
</template>