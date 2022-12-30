import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/';

class PokemonsService {
    getPublicContent(offset?: string, limit?: string) {
        let params = ""
        if (offset) {
            params += `?offset=${offset}`
            if (limit) {
                params += `&limit=${limit}`
            }
        }
        return axios.get(API_URL + `pokemons` + params);
    }

    getPokemonWithId(pokemonId: number) {
        const header = authHeader();
        return axios.get(API_URL + 'pokemon/' + pokemonId, { headers: header });
    }

}

export default new PokemonsService();
