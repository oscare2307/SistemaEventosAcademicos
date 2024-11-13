 // Al cargar la página, obtener los datos guardados
 window.onload = function() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        // Actualizar los datos en el perfil
        document.getElementById('perfil-nombre').textContent = userData.nombre;
        document.getElementById('perfil-email').textContent = userData.email;

        // Mostrar la imagen de perfil almacenada, si existe
        const profileImg = userData.photo ? userData.photo : "../assets/images/admin.png";
        document.getElementById('profile-img').src = profileImg;
    }
};