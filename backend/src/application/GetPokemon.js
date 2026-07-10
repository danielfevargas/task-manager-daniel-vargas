export class GetPokemon {
    constructor(pokemonApi) {
        this.pokemonApi = pokemonApi;
    }

    async execute(name) {
        const pokemon = await this.pokemonApi.getPokemon(name);
        return pokemon;
    }
}