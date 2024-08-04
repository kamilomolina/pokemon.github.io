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
}


// Ejecutar la actualización del botón al cargar la página
document.addEventListener('DOMContentLoaded', updateLoginButton);
