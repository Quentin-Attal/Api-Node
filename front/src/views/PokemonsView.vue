<script setup lang="ts">
import Pokemon from '@/components/Pokemon.vue';
import { onMounted } from 'vue';
import pokemonService from '../services/pokemon.service';
let pokemons: Array<{ id: string, name: string }> = []
onMounted(() => {
    pokemonService.getPublicContent()
        .then(res => {
            pokemons = res.data
        })
})
</script>

<template>
    <div class="row my-3">
        <Pokemon v-for="items of pokemons" :pokemon-data="items" :key="items.id" />
    </div>
</template>