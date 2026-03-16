import { empleos } from './datos.js';

function crearTarjetaHTML(empleo) {
  const clase = empleo.tipo === 'oferta' ? 'tarjeta-oferta' : 'tarjeta-demanda';
  const sueldoHTML = empleo.tipo === 'oferta'
    ? `<span class="badge-tarjeta">${empleo.sueldo.toLocaleString('es-ES')} €/año</span>`
    : '';

  return `
    <div class="card ${clase}">
      <div class="card-body">
        <h5 class="card-title">${empleo.titulo}</h5>
        <p class="card-text">${empleo.descripcion}</p>
        <div>
          <span class="badge-tarjeta">${empleo.jornada}</span>
          ${sueldoHTML}
        </div>
      </div>
    </div>
  `;
}

function renderTarjetas() {
  const ofertas  = empleos.filter(e => e.tipo === 'oferta');
  const demandas = empleos.filter(e => e.tipo === 'demanda');

  document.getElementById('contenedorOfertas').innerHTML = ofertas.length
    ? ofertas.map(crearTarjetaHTML).join('')
    : '<p class="text-center p-3 mb-0">No hay ofertas registradas.</p>';

  document.getElementById('contenedorDemandas').innerHTML = demandas.length
    ? demandas.map(crearTarjetaHTML).join('')
    : '<p class="text-center p-3 mb-0">No hay demandas registradas.</p>';
}

document.addEventListener('DOMContentLoaded', function () {
  const email = sessionStorage.getItem('usuarioLogueado');
  if (email) document.getElementById('usuarioLogueado').textContent = email;

  renderTarjetas();
});
