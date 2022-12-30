<script setup lang="ts">
const props = defineProps<{
    pokemonData: {
        id: string,
        name: string
    }
}>()

const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokemonData.id}.png`

</script>

<template>
    <div class="col-3 d-flex justify-content-center">
        <img :src="imageUrl" height="96" width="96" class="w-50" style="aspect-ratio: 1; height: auto;" />
    </div>
</template>