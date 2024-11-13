const API_URL = '/vacaciones';

function getRandomColor() {
    // Genera un color hexadecimal aleatorio
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'es',
        themeSystem: 'bootstrap5', // Cambiar a 'standard' para estilos personalizados
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: function(fetchInfo, successCallback, failureCallback) {
            axios.get(API_URL)
                .then(response => {
                    const eventos = response.data.map(evento => ({
                        title: `${evento.nombre} ${evento.apellido} ${evento.descripcion} ${evento.aula}`,
                        start: evento.fecha_inicial,
                        end: evento.fecha_final,
                        id: evento.id,
                        backgroundColor: getRandomColor(), // Asigna un color aleatorio a cada evento
                        borderColor: '#000', // Opcional: puedes definir el color del borde si lo deseas
                    }));
                    successCallback(eventos);
                })
                .catch(error => {
                    console.error('Error al obtener vacaciones:', error);
                    failureCallback(error);
                });
        },
        eventClick: function(info) {
            M.toast({html: `evento de ${info.event.title}`, classes: 'rounded'});
        }
    });

    calendar.render();
});
