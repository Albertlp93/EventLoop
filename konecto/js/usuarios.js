import { usuarios } from './datos.js';

function mostrarMensaje(texto, tipo) {
  const div = document.getElementById('mensajeUsuarios');
  div.className = `alert mt-3 alert-${tipo}`;
  div.textContent = texto;
  div.classList.remove('d-none');
  setTimeout(() => div.classList.add('d-none'), 3000);
}

function crearFilaHTML(usuario, indice) {
  const passwordMask = usuario.password.slice(0, 2) + '•'.repeat(usuario.password.length - 2);

  return `
    <tr>
      <td>${usuario.nombre}</td>
      <td>${usuario.email}</td>
      <td>${passwordMask}</td>
      <td>
        <button class="btn-eliminar" data-indice="${indice}">Eliminar</button>
      </td>
    </tr>
  `;
}

function renderTabla() {
  const contenedor = document.getElementById('tablaUsuarios');

  if (usuarios.length === 0) {
    contenedor.innerHTML = `
      <div class="tabla-empleos-wrapper">
        <div class="tabla-empleos-header">LISTADO USUARIOS</div>
        <div class="tabla-empleos-body">
          <p class="tabla-vacia">No hay usuarios registrados.</p>
        </div>
      </div>
    `;
    return;
  }

  const filas = usuarios.map((u, i) => crearFilaHTML(u, i)).join('');

  contenedor.innerHTML = `
    <div class="tabla-empleos-wrapper">
      <div class="tabla-empleos-header">LISTADO USUARIOS</div>
      <div class="tabla-empleos-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Contraseña</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>${filas}</tbody>
        </table>
      </div>
    </div>
  `;
}

function darDeAlta(evento) {
  evento.preventDefault();

  const nombre   = document.getElementById('inputNombre').value.trim();
  const email    = document.getElementById('inputEmail').value.trim();
  const password = document.getElementById('inputPassword').value;

  if (!nombre || !email || !password) {
    mostrarMensaje('Por favor, rellena todos los campos.', 'danger');
    return;
  }

  if (!email.includes('@') || email.indexOf('@') === 0 || email.indexOf('@') === email.length - 1) {
    mostrarMensaje('El email debe tener un formato válido (contener @).', 'danger');
    return;
  }

  if (password.length < 6) {
    mostrarMensaje('La contraseña debe tener al menos 6 caracteres.', 'danger');
    return;
  }

  if (usuarios.some(u => u.email === email)) {
    mostrarMensaje('Ya existe un usuario con ese correo electrónico.', 'danger');
    return;
  }

  usuarios.push({ nombre, email, password });
  renderTabla();
  document.getElementById('formUsuarios').reset();
  mostrarMensaje(`Usuario "${nombre}" dado de alta correctamente.`, 'success');
}

function darDeBaja(indice) {
  const usuario = usuarios[indice];
  if (!confirm(`¿Seguro que quieres eliminar a "${usuario.nombre}"?`)) return;
  usuarios.splice(indice, 1);
  renderTabla();
  mostrarMensaje(`Usuario "${usuario.nombre}" eliminado correctamente.`, 'success');
}

document.addEventListener('DOMContentLoaded', function () {
  const email = sessionStorage.getItem('usuarioLogueado');
  if (email) document.getElementById('usuarioLogueado').textContent = email;

  renderTabla();

  document.getElementById('formUsuarios').addEventListener('submit', darDeAlta);

  document.getElementById('tablaUsuarios').addEventListener('click', function (evento) {
    const boton = evento.target.closest('.btn-eliminar');
    if (boton) darDeBaja(Number(boton.dataset.indice));
  });
});
