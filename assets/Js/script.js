        const API_URL = '/vacaciones';

        document.addEventListener('DOMContentLoaded', function() {
            obtenerVacaciones();
        });

        // Obtener y mostrar todas las vacaciones
        function obtenerVacaciones() {
            axios.get(API_URL)
                .then(response => {
                    const vacaciones = response.data;
                    const lista = document.getElementById('vacaciones-list');
                    lista.innerHTML = '';
                    vacaciones.forEach(vacacion => {
                        const item = document.createElement('li');
                        item.className = 'list-group-item d-flex justify-content-between align-items-start';
                        item.innerHTML = `
                            <div class="ms-2 me-auto">
                                <div class="fw-bold">${vacacion.nombre} ${vacacion.apellido} - ${vacacion.descripcion} ${vacacion.aula}</div>
                                ${vacacion.fecha_inicial} a ${vacacion.fecha_final}
                            </div>
                            <div>
                                <button class="btn btn-sm btn-primary me-1" onclick="editarVacacion(${vacacion.id})">Editar</button>
                                <button class="btn btn-sm btn-danger" onclick="eliminarVacacion(${vacacion.id})">Eliminar</button>
                            </div>
                        `;
                        lista.appendChild(item);
                    });
                })
                .catch(error => console.error('Error al obtener Evento:', error));
        }

        // Añadir o actualizar vacaciones
        document.getElementById('vacaciones-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const id = document.getElementById('vacacion-id').value;
            const nombre = document.getElementById('nombre').value;
            const apellido = document.getElementById('apellido').value;
            const fecha_inicial = document.getElementById('fecha_inicial').value;
            const fecha_final = document.getElementById('fecha_final').value;
            const descripcion = document.getElementById('descripcion').value;
            const aula = document.getElementById('aula').value;

            const vacacion = { nombre, apellido, fecha_inicial, fecha_final, descripcion,aula };

            if (id) {
                axios.put(`${API_URL}/${id}`, vacacion)
                    .then(() => {
                        obtenerVacaciones();
                        this.reset();
                    })
                    .catch(error => console.error('Error al actualizar calendario:', error));
            } else {
                axios.post(API_URL, vacacion)
                    .then(() => {
                        obtenerVacaciones();
                        this.reset();
                    })
                    .catch(error => console.error('Error al añadir calendario:', error));
            }
        });

        // Editar vacaciones
        function editarVacacion(id) {
            axios.get(`${API_URL}/${id}`)
                .then(response => {
                    const vacacion = response.data;
                    document.getElementById('vacacion-id').value = vacacion.id;
                    document.getElementById('nombre').value = vacacion.nombre;
                    document.getElementById('apellido').value = vacacion.apellido;
                    document.getElementById('fecha_inicial').value = vacacion.fecha_inicial;
                    document.getElementById('fecha_final').value = vacacion.fecha_final;
                    document.getElementById('descripcion').value = vacacion.descripcion;
                    document.getElementById ('aula').value = vacacion.aula;
                })
                .catch(error => console.error('Error al obtener evento:', error));
        }

        // Eliminar vacaciones
        function eliminarVacacion(id) {
            if (confirm('¿Está seguro de que desea eliminar?')) {
                axios.delete(`${API_URL}/${id}`)
                    .then(() => obtenerVacaciones())
                    .catch(error => console.error('Error al eliminar evento:', error));
            }
        }