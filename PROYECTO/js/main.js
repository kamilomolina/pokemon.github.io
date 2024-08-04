const baseURL = 'http://localhost:3000/api'; // Cambia esto según la URL de tu backend

// Función para abrir el modal de inicio de sesión
const openLoginModal = () => {
    console.log("Abrir modal de inicio de sesión");
    document.getElementById('login-modal').style.display = 'block';
}

// Función para abrir el modal de registro
const openRegisterModal = () => {
    console.log("Abrir modal de registro");
    document.getElementById('register-modal').style.display = 'block';
}

// Función para cerrar el modal
const closeModal = () => {
    console.log("Cerrar modal");
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('register-modal').style.display = 'none';
    document.getElementById('search-modal').style.display = 'none';
    document.getElementById('searchInput').value = '';
}

// Función para registrar un usuario
const register = async () => {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    console.log(`Registrando usuario: ${username}`);

    try {
        const response = await axios.post(`${baseURL}/users/register`, { username, password });
        console.log(response.data); // Verificar la respuesta del servidor
        alert(response.data.message);
        closeModal();
    } catch (error) {
        console.error(error.response.data); // Mostrar errores en la consola
        alert(error.response.data.message);
    }
};

// Función para iniciar sesión
const login = async () => {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    console.log(`Iniciando sesión para usuario: ${username}`);

    try {
        const response = await axios.post(`${baseURL}/users/login`, { username, password });
        const token = response.data.token;
        localStorage.setItem('token', token); // Guardar el token en el almacenamiento local
        localStorage.setItem('username', username); // Guardar el nombre de usuario
        updateLoginButton();
        alert('Login successful');
        closeModal();
    } catch (error) {
        console.error(error.response.data); // Mostrar errores en la consola
        alert(error.response.data.message);
    }
};

// Función para cerrar sesión
const logout = () => {
    console.log("Cerrando sesión");
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    updateLoginButton();
};

// Función para actualizar el texto del botón de inicio de sesión
const updateLoginButton = () => {
    const username = localStorage.getItem('username');
    const loginButton = document.querySelector('.login-button');
    const registerButton = document.querySelector('.register-button');
    if (username) {
        loginButton.textContent = `Hola, ${username} (Cerrar sesión)`;
        loginButton.onclick = logout;
        registerButton.style.display = 'none'; // Ocultar el botón de registro
    } else {
        loginButton.textContent = 'Iniciar Sesión';
        loginButton.onclick = openLoginModal;
        registerButton.style.display = 'block'; // Mostrar el botón de registro
    }
};

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
}

// Función para hacer scroll hacia arriba
function scrollToTop() {
    document.body.scrollTop = 0; // Para Safari
    document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE y Opera
};

// Función para mostrar el modal de búsqueda
const showSearchModal = (content) => {
    const searchModal = document.getElementById('search-modal');
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = content;
    searchModal.style.display = 'block';
};

// Función para buscar Pokémon
const searchPokemon = async () => {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    if (!searchInput) {
        alert('Por favor, ingresa un nombre o número de Pokémon.');
        return;
    }

    try {
        const response = await axios.get(`${baseURL}/pokemons/search/${searchInput}`);
        const results = response.data;

        const searchResultsContainer = document.getElementById('search-results');
        searchResultsContainer.innerHTML = '';

        if (results.length > 0) {
            results.forEach(pokemon => {
                const pokemonElement = document.createElement('div');
                pokemonElement.classList.add('pokemon');
                pokemonElement.innerHTML = `
                    <h2>${pokemon.numero} - ${pokemon.nombre}</h2>
                    <p>Tipo: ${pokemon.tipo.join(', ')}</p>
                    <p>Descripción: ${pokemon.descripcion}</p>
                    <p>Habilidades: ${pokemon.habilidades.join(', ')}</p>
                    <img src="${pokemon.imagen}" alt="${pokemon.nombre}">
                `;
                searchResultsContainer.appendChild(pokemonElement);
            });
            document.getElementById('search-modal').style.display = 'block';
        } else {
            alert('No se encontró ningún Pokémon con ese nombre o número.');
        }
    } catch (error) {
        console.error('Error buscando Pokémon:', error);
        alert('Hubo un error al realizar la búsqueda. Por favor, intenta de nuevo.');
    }
};

// Ejecutar la actualización del botón al cargar la página
document.addEventListener('DOMContentLoaded', updateLoginButton);
