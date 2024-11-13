 // Añade clase 'visible' para activar la animación cuando se cargue la página
 document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.slide-in').forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, index * 100); // Retraso progresivo
    });
});