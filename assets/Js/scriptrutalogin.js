// Script para manejar el inicio de sesión
document.getElementById("loginForm").onsubmit = function(event) {
    event.preventDefault(); // Evita el envío estándar del formulario

    const correo = document.getElementById("Correo_electronico").value;
    const contraseña = document.getElementById("contraseña").value;

    fetch('/iniciarsesion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Correo_electronico: correo, contraseña: contraseña })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la red');
        }
        return response.json();
    })
    .then(data => {
        console.log("Respuesta del servidor:", data); // Log para depurar
        if (data.success) {
            alert("Inicio de sesión correcto."); // Mensaje de éxito
            window.location.href = "/Pagina2"; // Redirección a la página 2
        } else {
            alert("Credenciales incorrectas. Inténtalo de nuevo.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Ocurrió un error, por favor intenta más tarde.");
    });
};

// Script para manejar el registro
document.getElementById("registroForm").onsubmit = function(event) {
    event.preventDefault(); // Evita el envío estándar del formulario

    const nombre = document.getElementById("nombre_completo").value;
    const correo = document.getElementById("Correo_electronico_registro").value;
    const usuario = document.getElementById("usuario").value;
    const contraseña = document.getElementById("contraseña_registro").value;

    fetch('/validar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre_completo: nombre, Correo_electronico: correo, usuario: usuario, contraseña: contraseña })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la red');
        }
        return response.json();
    })
    .then(data => {
        console.log("Respuesta del servidor:", data); // Log para depurar
        if (data.success) {
            alert("Registro exitoso."); // Mensaje de éxito
            window.location.href = "/Pagina2"; // Redirección a la página 2
        } else {
            alert("No se pudo registrar. Inténtalo de nuevo.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Ocurrió un error, por favor intenta más tarde.");
    });
};
