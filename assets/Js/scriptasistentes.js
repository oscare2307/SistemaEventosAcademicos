function showTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.tab-button');
  tabs.forEach(tab => {
    tab.classList.remove('active');
  });
  buttons.forEach(button => {
    button.classList.remove('active');
  });
  document.getElementById(tabId).classList.add('active');
  event.currentTarget.classList.add('active');
}

function redirectToProfile() {
  window.location.href = './Perfil'; // Cambia 'perfil.html' por la URL de tu perfil
}

let asistentes = []; // Para almacenar los asistentes
let propuestas = []; // Para almacenar las propuestas
let recursos = []; // Para almacenar los recursos

// Función para guardar los datos en localStorage
function saveData() {
  // Guardar los arrays en localStorage como JSON
  localStorage.setItem('asistentes', JSON.stringify(asistentes));
  localStorage.setItem('propuestas', JSON.stringify(propuestas));
  localStorage.setItem('recursos', JSON.stringify(recursos));
}

// Cargar los datos desde localStorage
function loadData() {
  const savedAsistentes = localStorage.getItem('asistentes');
  const savedPropuestas = localStorage.getItem('propuestas');
  const savedRecursos = localStorage.getItem('recursos');

  if (savedAsistentes) {
    asistentes = JSON.parse(savedAsistentes);
  }

  if (savedPropuestas) {
    propuestas = JSON.parse(savedPropuestas);
  }

  if (savedRecursos) {
    recursos = JSON.parse(savedRecursos);
  }

  updateAsistenteTable();  // Actualiza la tabla de asistentes
  updatePropuestaContainer();  // Actualiza el contenedor de propuestas
  updateRecursoContainer();  // Actualiza el contenedor de recursos
}

// Llamar a loadData cuando la página se carga
document.addEventListener('DOMContentLoaded', loadData);

// Función para añadir asistente
function addAsistente() {
  const nombre = document.getElementById('asistenteNombre').value;
  const email = document.getElementById('asistenteEmail').value;
  const eventos = document.getElementById('asistenteEventos').value;

  const asistente = { nombre, email, eventos };
  asistentes.push(asistente);
  updateAsistenteTable();

  // Guardar los datos en el almacenamiento local
  saveData();

  // Limpiar el formulario
  document.getElementById('addAsistenteForm').reset();
  $('#addAsistenteModal').modal('hide');
}

// Actualizar la tabla de asistentes
function updateAsistenteTable() {
  const tableBody = document.getElementById('asistenteTable');
  tableBody.innerHTML = '';

  asistentes.forEach((asistente, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${asistente.nombre}</td>
      <td>${asistente.email}</td>
      <td>${asistente.eventos}</td>
      <td>
        <button class="btn btn-info" onclick="viewAsistente(${index})">Ver</button>
        <button class="btn btn-danger" onclick="deleteAsistente(${index})">Eliminar</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Función para ver detalles del asistente
function viewAsistente(index) {
  const asistente = asistentes[index];
  document.getElementById('viewAsistenteNombre').textContent = asistente.nombre;
  document.getElementById('viewAsistenteEmail').textContent = asistente.email;
  document.getElementById('viewAsistenteEventos').textContent = asistente.eventos;
  $('#viewAsistenteModal').modal('show');
}

// Función para eliminar asistente
function deleteAsistente(index) {
  asistentes.splice(index, 1); // Eliminar el asistente de la lista
  updateAsistenteTable(); // Actualizar la tabla
  saveData(); // Guardar los cambios
}

// Función para añadir propuesta
function addPropuesta() {
  const titulo = document.getElementById('propuestaTitulo').value;
  const usuario = document.getElementById('propuestaUsuario').value;
  const fecha = document.getElementById('propuestaFecha').value;
  const estado = document.getElementById('propuestaEstado').value;

  const propuesta = { titulo, usuario, fecha, estado };
  propuestas.push(propuesta);
  updatePropuestaContainer();

  // Guardar los datos en el almacenamiento local
  saveData();

  // Limpiar el formulario
  document.getElementById('addPropuestaForm').reset();
  $('#addPropuestaModal').modal('hide');
}

// Actualizar el contenedor de propuestas
function updatePropuestaContainer() {
  const container = document.getElementById('propuestaContainer');
  container.classList.add('centered-container'); // Añadir la clase para centrar
  container.innerHTML = '';

  propuestas.forEach((propuesta, index) => {
    const card = document.createElement('div');
    card.classList.add('col-md-4');
    card.innerHTML = `
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">${propuesta.titulo}</h5>
          <p class="card-text">Presentada por: ${propuesta.usuario}</p>
          <p class="card-text">Fecha: ${propuesta.fecha}</p>
          <p class="card-text">Estado: ${propuesta.estado}</p>
          <button class="btn btn-info" onclick="viewPropuesta(${index})">Ver</button>
          <button class="btn btn-danger" onclick="deletePropuesta(${index})">Eliminar</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}
// Función para eliminar propuesta
function deletePropuesta(index) {
  if (index >= 0 && index < propuestas.length) {
    propuestas.splice(index, 1); // Eliminar la propuesta de la lista
    updatePropuestaContainer(); // Actualizar el contenedor
    saveData(); // Guardar los cambios
  } else {
    console.error('Índice no válido:', index);
  }
}


// Función para ver detalles de propuesta
function viewPropuesta(index) {
  const propuesta = propuestas[index];
  document.getElementById('viewPropuestaTitulo').textContent = propuesta.titulo;
  document.getElementById('viewPropuestaUsuario').textContent = propuesta.usuario;
  document.getElementById('viewPropuestaFecha').textContent = propuesta.fecha;
  document.getElementById('viewPropuestaEstado').textContent = propuesta.estado;
  $('#viewPropuestaModal').modal('show');
}

// Función para añadir recurso
function addRecurso() {
  const titulo = document.getElementById('recursoTitulo').value;
  const tipo = document.getElementById('recursoTipo').value;
  const enlace = document.getElementById('recursoEnlace').value;

  const recurso = { titulo, tipo, enlace };
  recursos.push(recurso);
  updateRecursoContainer();

  // Guardar los datos en el almacenamiento local
  saveData();

  // Limpiar el formulario
  document.getElementById('addRecursoForm').reset();
  $('#addRecursoModal').modal('hide');
}

// Actualizar el contenedor de recursos
function updateRecursoContainer() {
  const container = document.getElementById('recursoContainer');
  container.innerHTML = '';

  recursos.forEach((recurso, index) => {
    const card = document.createElement('div');
    card.classList.add('col-md-4');
    container.classList.add('centered-container'); // Añadir la clase para centrar
    card.innerHTML = `
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">${recurso.titulo}</h5>
          <p class="card-text">Tipo: ${recurso.tipo}</p>
          <p class="card-text">Enlace: <a href="${recurso.enlace}" target="_blank">${recurso.enlace}</a></p>
          <button class="btn btn-danger" onclick="deleteRecurso(${index})">Eliminar</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Función para eliminar recurso
function deleteRecurso(index) {
  if (index >= 0 && index < recursos.length) {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este recurso?');
    if (confirmDelete) {
      recursos.splice(index, 1); // Eliminar la propuesta de la lista
      updateRecursoContainer(); // Actualizar el contenedor
      saveData(); // Guardar los cambios
    }
  } else {
    console.error('Índice no válido:', index);
  }
}

