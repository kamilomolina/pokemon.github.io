document.addEventListener('DOMContentLoaded', () => {
    fetchPokemonsByRegion('Kanto');
});

const fetchPokemonsByRegion = async (region) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/pokemons/region/${region}`);
        const pokemons = response.data;
        displayPokemons(pokemons);
    } catch (error) {
        console.error('Error fetching Pokemons:', error);
    }
};

const displayPokemons = (pokemons) => {
    const pokedexContainer = document.getElementById('pokedex');
    pokedexContainer.innerHTML = '';

    pokemons.forEach(pokemon => {
        const pokemonElement = document.createElement('div');
        pokemonElement.classList.add('pokemon');
        
        pokemonElement.innerHTML = `
            <h2>${pokemon.numero}. ${pokemon.nombre}</h2>
            <img src="${pokemon.imagen}" alt="${pokemon.nombre}">
            <div class="pokemon-details">
                <h4>Tipo: ${pokemon.tipo.join(', ')}</h4>
                <p>${pokemon.descripcion}</p>
                <p>Habilidades: ${pokemon.habilidades.join(', ')}</p>
            </div>
        `;
        
        pokedexContainer.appendChild(pokemonElement);
    });
};
