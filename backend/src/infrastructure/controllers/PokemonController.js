export class PokemonController {
    constructor(getPokemonUseCase) {
        this.getPokemonUseCase = getPokemonUseCase;
    }

    getPokemon = async (req, res) => {
        try {
            const pokemon = await this.getPokemonUseCase.execute(req.params.name);
            res.status(200).json(pokemon);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}