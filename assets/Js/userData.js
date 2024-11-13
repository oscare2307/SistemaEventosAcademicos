// userData.js

// Guardar el perfil en localStorage
function saveProfile(data) {
    localStorage.setItem("userProfile", JSON.stringify(data));
}

// Cargar el perfil desde localStorage
function loadProfile() {
    const profileData = localStorage.getItem("userProfile");
    if (profileData) {
        try {
            return JSON.parse(profileData);
        } catch (error) {
            console.error("Error al analizar los datos del perfil:", error);
            return null;
        }
    }
    return null;
}

// Actualizar la vista con los datos del perfil
function updateProfileView() {
    const profileData = loadProfile();

    if (profileData) {
        // Actualiza el icono de perfil en la barra de navegación
        const profileImg = document.querySelector("a.nav-link[href='perfil'] img");
        if (profileImg) {
            profileImg.src = profileData.imageURL || "../assets/images/admin.png";
        }

        // Actualiza otras áreas con información del usuario
        const userName = document.querySelector(".user-name");
        if (userName && profileData.name) {
            userName.textContent = profileData.name;
        }

    } else {
        console.warn("No se encontró el perfil en el almacenamiento.");
    }
}

// Llamar a la función al cargar la página
document.addEventListener("DOMContentLoaded", updateProfileView);
