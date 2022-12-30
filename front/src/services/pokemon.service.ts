import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/';

class PokemonsService {
    getPublicContent() {
        return axios.get(API_URL + 'pokemons');
    }

    getPokemonWithId(pokemonId: number) {
        const header = authHeader();
        return axios.get(API_URL + 'pokemon/' + pokemonId, { headers: header });
    }

}

export default new PokemonsService();
