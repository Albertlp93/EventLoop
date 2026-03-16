import { empleos } from './datos.js';

function mostrarMensaje(texto, tipo) {
  const div = document.getElementById('mensajeEmpleos');
  div.className = `alert mt-3 alert-${tipo}`;
  div.textContent = texto;
  div.classList.remove('d-none');
  setTimeout(() => div.classList.add('d-none'), 3000);
}

function crearFilaHTML(empleo, indiceReal) {
  const sueldoTexto = empleo.tipo === 'oferta'
    ? `${empleo.sueldo.toLocaleString('es-ES')} €`
    : '—';

  return `
    <tr>
      <td>${empleo.titulo}</td>
      <td>${empleo.jornada}</td>
      <td>${sueldoTexto}</td>
      <td>${empleo.tipo}</td>
      <td>
        <button class="btn-eliminar" data-indice="${indiceReal}">Eliminar</button>
      </td>
    </tr>
  `;
}

function generarTablaHTML(titulo, lista) {
  if (lista.length === 0) {
    return `
      <div class="tabla-empleos-wrapper">
        <div class="tabla-empleos-header">${titulo}</div>
        <div class="tabla-empleos-body">
          <p class="tabla-vacia">No hay ${titulo.toLowerCase()} registradas.</p>
        </div>
      </div>
    `;
  }

  const filas = lista.map(e => crearFilaHTML(e, empleos.indexOf(e))).join('');

  return `
    <div class="tabla-empleos-wrapper">
      <div class="tabla-empleos-header">${titulo}</div>
      <div class="tabla-empleos-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Título</th>
              <th>Jornada</th>
              <th>Sueldo</th>
              <th>Tipo</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>${filas}</tbody>
        </table>
      </div>
    </div>
  `;
}

function renderTablas() {
  document.getElementById('tablaOfertas').innerHTML =
    generarTablaHTML('OFERTAS', empleos.filter(e => e.tipo === 'oferta'));
  document.getElementById('tablaDemandas').innerHTML =
    generarTablaHTML('DEMANDAS', empleos.filter(e => e.tipo === 'demanda'));
}

function darDeAlta(evento) {
  evento.preventDefault();

  const titulo      = document.getElementById('inputTitulo').value.trim();
  const jornada     = document.getElementById('inputJornada').value;
  const sueldo      = document.getElementById('inputSueldo').value;
  const tipo        = document.getElementById('inputTipo').value;
  const descripcion = document.getElementById('inputDescripcion').value.trim();

  if (!titulo || !jornada || !sueldo || !tipo || !descripcion) {
    mostrarMensaje('Por favor, rellena todos los campos.', 'danger');
    return;
  }

  empleos.push({ titulo, descripcion, jornada, sueldo: Number(sueldo), tipo });
  renderTablas();
  document.getElementById('formEmpleos').reset();
  mostrarMensaje(`"${titulo}" dado de alta correctamente.`, 'success');
}

function darDeBaja(indice) {
  const empleo = empleos[indice];
  if (!confirm(`¿Seguro que quieres eliminar "${empleo.titulo}"?`)) return;
  empleos.splice(indice, 1);
  renderTablas();
  mostrarMensaje(`"${empleo.titulo}" eliminado correctamente.`, 'success');
}

function manejarClic(evento) {
  const boton = evento.target.closest('.btn-eliminar');
  if (boton) darDeBaja(Number(boton.dataset.indice));
}

document.addEventListener('DOMContentLoaded', function () {
  const email = sessionStorage.getItem('usuarioLogueado');
  if (email) document.getElementById('usuarioLogueado').textContent = email;

  renderTablas();

  document.getElementById('formEmpleos').addEventListener('submit', darDeAlta);
  document.getElementById('tablaOfertas').addEventListener('click', manejarClic);
  document.getElementById('tablaDemandas').addEventListener('click', manejarClic);
});
