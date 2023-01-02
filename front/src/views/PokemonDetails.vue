<script setup lang="ts">
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import pokemonService from '../services/pokemon.service';

type Pokemon = {
    "id": string,
    "name": string,
    "type_1": string,
    "type_2": string,
    "total": number,
    "hp": number,
    "attack": number,
    "defense": number,
    "spatk": number,
    "spdef": number,
    "speed": number,
    "generation": number,
    "legendary": boolean
}

type Stats = "attack" | "defense" | "hp" | 'spatk' | "spdef" | "speed";

const route = useRoute();
const pokemonId = route.params.id as string;
const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
const pokemon: Pokemon = reactive({ name: "", id: "", attack: 0, defense: 0, generation: 0, hp: 0, legendary: false, spatk: 0, spdef: 0, speed: 0, total: 0, type_1: "", type_2: "" });
const stats: Array<Stats> = ['attack', "defense", "hp", 'spatk', "spdef", "speed"]
pokemonService.getPokemonWithId(pokemonId)
    .then(res => {
        const data = res.data[0]
        pokemon.id = data.id
        pokemon.name = data.name
        pokemon.hp = data.hp
        pokemon.attack = data.attack
        pokemon.defense = data.defense
        pokemon.generation = data.generation
        pokemon.legendary = data.legendary
        pokemon.spatk = data.spatk
        pokemon.spdef = data.spdef
        pokemon.speed = data.speed
        pokemon.total = data.total
        pokemon.type_1 = data.type_1
        pokemon.type_2 = data.type_2
    })

const width = (stats: number) => {
    return "width:" + stats / 260 * 100 + "%"
}

const classColorStats = (stats: number) => {
    if (stats <= 50) {
        return "red"
    } else if (stats <= 100) {
        return "yellow"
    } else if (stats <= 150) {
        return "olive"
    } else if (stats <= 200) {
        return "green"
    } else {
        return "blue"
    }
}

</script>

<template>
    <div class="d-flex align-items-center flex-column text-center">
        <img :src="imageUrl" height="96" width="96" class="w-25" style="aspect-ratio: 1; height: auto;" />
        <p class="fs-3 text-white">{{ pokemon.name }}</p>
    </div>
    <div v-if="!!pokemon.hp" class="row">
        <div class="col-5">
            <h3>Type</h3>
            <span class="px-3 py-1 text-light rounded fs-6" :class="pokemon.type_1.toLowerCase()">
                {{ pokemon.type_1 }}
            </span>
            <span class="px-3 py-1 mx-3 text-light rounded fs-6" :class="pokemon.type_2.toLowerCase()"
                v-if="!!pokemon.type_2">
                {{ pokemon.type_2 }}
            </span>
        </div>
        <div class="col-5">
            <h3>Statistique</h3>
            <div class="d-flex align-items-baseline" v-for="stat in stats">
                {{ stat }} {{ pokemon[stat] }}
                <div class="w-50 mx-3 progress bg-transparent">
                    <div class="progress-bar rounded-2" :class="classColorStats(pokemon[stat])" role="progressbar"
                        :style="width(pokemon[stat])" aria-valuemin="0" aria-valuemax="260" aria-valuenow="125"></div>
                </div>
            </div>
        </div>
    </div>
</template>