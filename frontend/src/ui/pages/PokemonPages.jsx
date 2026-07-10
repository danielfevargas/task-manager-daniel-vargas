import { useState } from "react";
import { PokemonForm } from "../components/PokemonForm";


export function PokemonPages() {
    const [showPokemonForm, setShowPokemonForm] = useState(false);

    const openPokemonForm = () => {
        setShowPokemonForm(true);
    };

    const closePokemonForm = () => {
        setShowPokemonForm(false);
    };

    return (
        <>
            <button onClick={openPokemonForm}>
                Buscar Pokemon
            </button>
            
            {showPokemonForm && (
                <div className="modal">
                    <PokemonForm onClose={closePokemonForm}></PokemonForm>
                </div>
            )}
        </>
    );
}