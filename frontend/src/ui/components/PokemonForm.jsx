import { useState } from "react";
import { pokemonApi } from "../../infrastructure/api/pokemonApi";

export function PokemonForm({ onClose }) {
    const [pokemonId, setPokemonId] = useState("");
    const [pokemon, setPokemon] = useState(null);

    const handleSearch = async () => {
        console.log("Buscando...");
        const data = await pokemonApi.getPokemon(pokemonId);
        console.log(data);
        setPokemon(data)
    };

    return (
        <div>
            <h2>Buscar Pokemon</h2>

            <input
                value={pokemonId}
                onChange={(e) => setPokemonId(e.target.value)}
                placeholder="Ingrese el ID"
            />

            <button onClick={handleSearch}>
                Buscar
            </button>

            <button onClick={onClose}>
                Cerrar
            </button>

            {pokemon && (
                <div>
                    <h3>{pokemon.name}</h3>
                     <p>Altura: {pokemon.height}</p>
                    <p>Peso: {pokemon.weight}</p>

                    <p>
                        Tipo:
                        {" "}
                        {pokemon.types.map(type => type.type.name).join(", ")}
                    </p>
                    <p>
                        Habilidades:{" "}
                        {pokemon.abilities.map(ability => ability.ability.name).join(", ")}
                    </p>
                </div>
            )}

        </div>
        
    )

}
