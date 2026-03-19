import { usuarios } from './datos.js';

document.addEventListener('DOMContentLoaded', () => {
  const emailSesion = sessionStorage.getItem('usuarioLogueado');
  if (emailSesion) {
    document.getElementById('usuarioLogueado').textContent = emailSesion;
    document.getElementById('btnCerrarSesion').classList.remove('d-none');
    document.getElementById('btnCerrarSesion').onclick = () => { 
      sessionStorage.removeItem('usuarioLogueado'); 
      window.location.reload(); 
    };
  }

  document.getElementById('formLogin').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('inputEmail').value;
    const pass = document.getElementById('inputPassword').value;
    const user = usuarios.find(u => u.email === email && u.password === pass);

    const msg = document.getElementById('mensajeLogin');
    if (user) {
      sessionStorage.setItem('usuarioLogueado', user.email);
      window.location.href = 'index.html';
    } else {
      msg.textContent = "Error: Usuario o contraseña incorrectos.";
      msg.className = "alert alert-danger mt-3";
      msg.classList.remove('d-none');
    }
  });
});