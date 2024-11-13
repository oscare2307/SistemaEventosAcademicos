// Al cargar la página, obtener los datos guardados
window.onload = function() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        document.getElementById('nombre').value = userData.nombre;
        document.getElementById('email').value = userData.email;
        // Mostrar la foto de perfil almacenada si existe
        const profileImg = userData.photo ? userData.photo : "https://via.placeholder.com/120";
        document.getElementById('profile-img').src = profileImg;
    }
};

// Manejar la actualización del perfil
document.getElementById('config-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const photoInput = document.getElementById('profile-photo');
    let photo = document.getElementById('profile-img').src;

    // Si se seleccionó una nueva foto, actualizarla
    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            photo = e.target.result;
            saveUserData(nombre, email, password, photo);
        };
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        saveUserData(nombre, email, password, photo);
    }
});

function saveUserData(nombre, email, password, photo) {
    // Crear un objeto con los datos
    const userData = {
        nombre: nombre,
        email: email,
        password: password || 'defaultPassword', // Si no se introduce contraseña, se usa una predeterminada
        photo: photo
    };

    // Guardar los datos en localStorage
    localStorage.setItem('userData', JSON.stringify(userData));

    // Redirigir al perfil con los datos actualizados
    window.location.href = '/perfil'; // Asumiendo que la ruta del perfil es '/perfil'
}