import { usuarios } from './datos.js';

//LÓGICA DE SESIÓN (NAVBAR) ---
function gestionarNavbarSesion() {
  const emailLogueado = sessionStorage.getItem('usuarioLogueado');
  const txtUsuario = document.getElementById('usuarioLogueado');
  const btnSalir = document.getElementById('btnCerrarSesion');

  if (emailLogueado) {
    txtUsuario.textContent = emailLogueado;
    btnSalir.classList.remove('d-none');
    btnSalir.onclick = (e) => {
      e.preventDefault();
      sessionStorage.removeItem('usuarioLogueado');
      window.location.reload(); // Recargamos para actualizar vista
    };
  }
}

//UTILIDADES DE MENSAJES ---
function mostrarMensaje(texto, tipo) {
  const div = document.getElementById('mensajeUsuarios');
  div.className = `alert mt-3 alert-${tipo}`;
  div.textContent = texto;
  div.classList.remove('d-none');
  setTimeout(() => div.classList.add('d-none'), 3000);
}

//RENDERIZADO DE LA TABLA ---
function renderTablaUsuarios() {
  const contenedor = document.getElementById('tablaUsuarios');

  if (usuarios.length === 0) {
    contenedor.innerHTML = `
      <div class="tabla-empleos-wrapper">
        <div class="tabla-empleos-header">LISTADO USUARIOS</div>
        <div class="tabla-empleos-body">
          <p class="tabla-vacia">No hay usuarios registrados en el sistema.</p>
        </div>
      </div>`;
    return;
  }

  const filas = usuarios.map((u, i) => {
    // Convertimos la contraseña en puntos (mask)
    const passMask = "•".repeat(u.password.length);
    
    return `
      <tr>
        <td>${u.nombre}</td>
        <td>${u.email}</td>
        <td><code>${passMask}</code></td>
        <td>
          <button class="btn-eliminar" data-indice="${i}">Eliminar</button>
        </td>
      </tr>`;
  }).join('');

  contenedor.innerHTML = `
    <div class="tabla-empleos-wrapper">
      <div class="tabla-empleos-header">LISTADO USUARIOS</div>
      <div class="tabla-empleos-body">
        <table class="table table-bordered align-middle">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Password</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>${filas}</tbody>
        </table>
      </div>
    </div>`;
}

//ACCIONES: ALTA Y BAJA ---

function darDeAlta(evento) {
  evento.preventDefault();

  const nombre = document.getElementById('inputNombre').value.trim();
  const email = document.getElementById('inputEmail').value.trim();
  const password = document.getElementById('inputPassword').value;

  //Validaciones básicas
  if (!nombre || !email || !password) {
    mostrarMensaje("Todos los campos son obligatorios.", "danger");
    return;
  }

  //Validación de email duplicado
  const existe = usuarios.find(u => u.email === email);
  if (existe) {
    mostrarMensaje("Este email ya está registrado.", "danger");
    return;
  }

  // Añadimos al array de datos.js
  usuarios.push({ nombre, email, password });

  // Actualizamos vista
  renderTablaUsuarios();
  document.getElementById('formUsuarios').reset();
  mostrarMensaje(`Usuario ${nombre} creado con éxito.`, "success");
}

function darDeBaja(indice) {
  const usuario = usuarios[indice];
  
  // No permitimos que el usuario se borre a sí mismo si está logueado
  const logueado = sessionStorage.getItem('usuarioLogueado');
  if (usuario.email === logueado) {
    alert("No puedes eliminar tu propio usuario mientras tienes la sesión iniciada.");
    return;
  }

  if (confirm(`¿Estás seguro de eliminar a ${usuario.nombre}?`)) {
    usuarios.splice(indice, 1);
    renderTablaUsuarios();
    mostrarMensaje("Usuario eliminado correctamente.", "success");
  }
}

//INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
  gestionarNavbarSesion();
  renderTablaUsuarios();

  // Evento del formulario
  document.getElementById('formUsuarios').addEventListener('submit', darDeAlta);

  // Delegación de eventos para el botón eliminar
  document.getElementById('tablaUsuarios').addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-eliminar');
    if (btn) {
      const idx = btn.dataset.indice;
      darDeBaja(Number(idx));
    }
  });
});