import axios from "axios";

export class PokemonApi {
    async getPokemon(name) {
        const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${name}`
        );

        return response.data;
    }
}