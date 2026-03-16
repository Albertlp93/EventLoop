import { usuarios } from './datos.js';

function mostrarMensaje(texto, tipo) {
  const div = document.getElementById('mensajeLogin');
  div.className = `alert mt-3 alert-${tipo}`;
  div.textContent = texto;
  div.classList.remove('d-none');
}

function procesarLogin(evento) {
  evento.preventDefault();

  const email    = document.getElementById('inputEmail').value.trim();
  const password = document.getElementById('inputPassword').value.trim();

  if (!email || !password) {
    mostrarMensaje('Por favor, rellena todos los campos.', 'danger');
    return;
  }

  const usuario = usuarios.find(u => u.email === email && u.password === password);

  if (usuario) {
    sessionStorage.setItem('usuarioLogueado', usuario.email);
    document.getElementById('usuarioLogueado').textContent = usuario.email;
    mostrarMensaje(`¡Bienvenido/a, ${usuario.nombre}!`, 'success');
  } else {
    mostrarMensaje('Credenciales incorrectas. Revisa tu email y contraseña.', 'danger');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const email = sessionStorage.getItem('usuarioLogueado');
  if (email) document.getElementById('usuarioLogueado').textContent = email;

  document.getElementById('formLogin').addEventListener('submit', procesarLogin);
});
