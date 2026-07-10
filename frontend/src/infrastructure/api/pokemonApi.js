const BASE_URL = "http://localhost:3000/api";

async function handleResponse(response) {
    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.error || `Error ${response.status}`);
    }
    if (response.status === 204) return null; 
    return response.json();
}

export const pokemonApi = {
    async getPokemon(name){
        const response = await fetch(`${BASE_URL}/pokemon/${name}`);
        return handleResponse(response);
    }
};