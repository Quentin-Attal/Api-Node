<script setup lang="ts">
import Pokemon from '@/components/Pokemon.vue';
import { reactive, watch, ref } from 'vue';
import pokemonService from '../services/pokemon.service';

const pokemons: Array<{ id: string, name: string }> = reactive([])
let offset = "0";
let rows = ref(100);
let perPage = ref(10);
let currentPage = ref(1)

const fetchPokemon = (offset: string) => {
    pokemonService.getPublicContent(offset)
        .then(res => {
            if (res.data.pokemons) {
                pokemons.length = 0;
                pokemons.push(...res.data.pokemons);
                console.log(res.data)
                rows = parseInt(res.data.total) as any;
                perPage = res.data.perPage;
            }
        })
}

fetchPokemon(offset)

watch(currentPage, (newPage, oldPage) => {
    offset = ((newPage - 1) * 20).toString();
    fetchPokemon(offset)
})

</script>

<template>
    <div class="row my-3">
        <Pokemon v-for="items of pokemons" :pokemon-data="items" :key="items.id" />
    </div>
    <div class="overflow-auto py-2">
        <b-pagination v-model="currentPage" align="center" size="lg" :total-rows="rows" :per-page="perPage" />
    </div>
</template>