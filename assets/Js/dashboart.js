document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const resultsMessage = document.getElementById('resultsMessage');
    
    // Evento para capturar la entrada de búsqueda
    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        
        // Filtrar las tablas (eventos y usuarios)
        const foundEvents = filterTable('eventosBody', searchTerm);
        const foundUsers = filterTable('usuariosBody', searchTerm);

        // Mostrar el mensaje dependiendo de si se encontraron resultados
        if (foundEvents || foundUsers) {
            resultsMessage.textContent = 'Resultados encontrados';
            resultsMessage.classList.remove('text-danger');
            resultsMessage.classList.add('text-success');
        } else {
            resultsMessage.textContent = 'No se encontraron resultados';
            resultsMessage.classList.remove('text-success');
            resultsMessage.classList.add('text-danger');
        }
    });

    // Función para filtrar las tablas
    function filterTable(tableBodyId, searchTerm) {
        const tableBody = document.getElementById(tableBodyId);
        const rows = tableBody.getElementsByTagName('tr');
        let found = false;

        Array.from(rows).forEach(row => {
            const cells = row.getElementsByTagName('td');
            let match = false;

            Array.from(cells).forEach(cell => {
                if (cell.textContent.toLowerCase().includes(searchTerm)) {
                    match = true;
                }
            });

            row.style.display = match ? '' : 'none';
            if (match) found = true;
        });

        return found;
    }

    // Cargar datos de LocalStorage
    loadData();

    // Función para cargar los datos de eventos y usuarios desde LocalStorage
    function loadData() {
        const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Cargar eventos en la tabla
        const eventosBody = document.getElementById('eventosBody');
        eventosBody.innerHTML = '';  // Limpiar la tabla antes de agregar los nuevos eventos
        eventos.forEach(event => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${event.name}</td>
                <td>${event.date}</td>
                <td><span class="badge bg-${event.status === 'Confirmado' ? 'success' : event.status === 'Pendiente' ? 'warning' : 'danger'}">${event.status}</span></td>
                <td><button class="btn btn-link">Detalles</button></td>
                <td><button class="btn btn-danger" onclick="deleteEvent(${event.id})">Eliminar</button></td>
            `;
            eventosBody.appendChild(newRow);
        });

        // Cargar usuarios en la tabla
        const usuariosBody = document.getElementById('usuariosBody');
        usuariosBody.innerHTML = '';  // Limpiar la tabla antes de agregar los nuevos usuarios
        usuarios.forEach(user => {
            const newUserRow = document.createElement('tr');
            newUserRow.innerHTML = `
                <td>${user.name}</td>
                <td>${user.role}</td>
                <td><span class="badge bg-${user.status === 'Activo' ? 'success' : user.status === 'Inactivo' ? 'warning' : 'danger'}">${user.status}</span></td>
                <td><button class="btn btn-danger" onclick="deleteUser(${user.id})">Eliminar</button></td>
            `;
            usuariosBody.appendChild(newUserRow);
        });

        // Actualizar estadísticas
        updateStats();
    }

    // Actualizar estadísticas
    function updateStats() {
        const totalEventos = document.getElementById('eventosBody').rows.length;
        const totalUsuarios = document.getElementById('usuariosBody').rows.length;
        const totalAsistentes = Array.from(document.getElementById('usuariosBody').rows)
            .filter(row => row.cells[2].textContent.trim() === 'Activo').length;

        document.getElementById('totalEventos').textContent = totalEventos;
        document.getElementById('totalUsuarios').textContent = totalUsuarios;
        document.getElementById('totalAsistentes').textContent = totalAsistentes;
    }

    // Guardar evento
    const saveEventBtn = document.getElementById('saveEventBtn');
    saveEventBtn.addEventListener('click', () => {
        const eventName = document.getElementById('eventName').value;
        const eventDate = document.getElementById('eventDate').value;
        const eventStatus = document.getElementById('eventStatus').value;

        if (eventName && eventDate && eventStatus) {
            const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
            const eventId = Date.now(); // Generar un ID único

            const newEvent = {
                id: eventId,
                name: eventName,
                date: eventDate,
                status: eventStatus
            };

            eventos.push(newEvent);
            localStorage.setItem('eventos', JSON.stringify(eventos));

            loadData();  // Recargar la tabla de eventos
            $('#addEventModal').modal('hide');
        }
    });

    // Guardar usuario
    const saveUserBtn = document.getElementById('saveUserBtn');
    saveUserBtn.addEventListener('click', () => {
        const userName = document.getElementById('userName').value;
        const userRole = document.getElementById('userRole').value;
        const userStatus = document.getElementById('userStatus').value;

        if (userName && userRole && userStatus) {
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const userId = Date.now(); // Generar un ID único

            const newUser = {
                id: userId,
                name: userName,
                role: userRole,
                status: userStatus
            };

            usuarios.push(newUser);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            loadData();  // Recargar la tabla de usuarios
            $('#addUserModal').modal('hide');
        }
    });

    // Eliminar evento
    window.deleteEvent = function(eventId) {
        const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
        const updatedEventos = eventos.filter(event => event.id !== eventId);
        localStorage.setItem('eventos', JSON.stringify(updatedEventos));

        loadData();  // Recargar la tabla de eventos
    };

    // Eliminar usuario
    window.deleteUser = function(userId) {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const updatedUsuarios = usuarios.filter(user => user.id !== userId);
        localStorage.setItem('usuarios', JSON.stringify(updatedUsuarios));

        loadData();  // Recargar la tabla de usuarios
    };
});
