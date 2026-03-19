import { empleos, usuarios } from './datos.js';

function actualizarInterfazUsuario() {
  const emailLogueado = sessionStorage.getItem('usuarioLogueado');
  const txtNavbar = document.getElementById('usuarioLogueado');
  const btnSalir = document.getElementById('btnCerrarSesion');
  const avatar = document.getElementById('avatarUsuario');
  const nombreHero = document.getElementById('nombreUsuarioHero');

  if (emailLogueado) {
    const usuario = usuarios.find(u => u.email === emailLogueado);
    txtNavbar.textContent = emailLogueado;
    btnSalir.classList.remove('d-none');
    btnSalir.onclick = () => { sessionStorage.removeItem('usuarioLogueado'); window.location.reload(); };

    if (usuario) {
      avatar.textContent = usuario.nombre.charAt(0).toUpperCase();
      nombreHero.textContent = `¡Bienvenido, ${usuario.nombre}!`;
      nombreHero.classList.remove('text-muted'); 
      nombreHero.style.color = "#ffffff"; 
      nombreHero.style.fontWeight = "700"; 
      nombreHero.style.fontSize = "1rem"; 
    }
  }
}

function renderTarjetas() {
  const crearCard = (e) => `
    <div class="card ${e.tipo === 'oferta' ? 'tarjeta-oferta' : 'tarjeta-demanda'} mb-3 shadow-sm">
      <div class="card-body">
        <h5 class="card-title">${e.titulo}</h5>
        <p class="card-text">${e.descripcion}</p>
        <span class="badge-tarjeta">${e.jornada}</span>
        ${e.tipo === 'oferta' ? `<span class="badge-tarjeta">${e.sueldo.toLocaleString()} €/año</span>` : ''}
      </div>
    </div>`;

  document.getElementById('contenedorOfertas').innerHTML = empleos.filter(e => e.tipo === 'oferta').map(crearCard).join('') || 'Sin ofertas.';
  document.getElementById('contenedorDemandas').innerHTML = empleos.filter(e => e.tipo === 'demanda').map(crearCard).join('') || 'Sin demandas.';
}

document.addEventListener('DOMContentLoaded', () => {
  actualizarInterfazUsuario();
  renderTarjetas();
});