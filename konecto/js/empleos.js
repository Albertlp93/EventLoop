import { empleos } from './datos.js';

function gestionarNavbarSesion() {
  const email = sessionStorage.getItem('usuarioLogueado');
  const txt = document.getElementById('usuarioLogueado');
  const btn = document.getElementById('btnCerrarSesion');
  if (email) {
    txt.textContent = email;
    btn.classList.remove('d-none');
    btn.onclick = () => { sessionStorage.removeItem('usuarioLogueado'); window.location.href = 'login.html'; };
  }
}

function gestionarVisibilidadSueldo() {
  const tipo = document.getElementById('inputTipo').value;
  const contenedor = document.getElementById('contenedorInputSueldo');
  tipo === 'oferta' ? contenedor.classList.remove('d-none') : contenedor.classList.add('d-none');
}

function renderTablas() {
  const genTabla = (titulo, lista) => {
    const esOferta = titulo === 'OFERTAS';
    if (!lista.length) return `<div class="tabla-empleos-wrapper mb-4"><div class="tabla-empleos-header">${titulo}</div><div class="tabla-empleos-body"><p class="p-3 mb-0">No hay registros.</p></div></div>`;
    
    const filas = lista.map(e => `
      <tr>
        <td>${e.titulo}</td>
        <td>${e.jornada}</td>
        ${esOferta ? `<td>${e.sueldo.toLocaleString()} €</td>` : ''}
        <td>${e.tipo}</td>
        <td><button class="btn-eliminar" data-indice="${empleos.indexOf(e)}">Eliminar</button></td>
      </tr>`).join('');

    return `
      <div class="tabla-empleos-wrapper mb-4">
        <div class="tabla-empleos-header">${titulo}</div>
        <div class="tabla-empleos-body">
          <table class="table table-bordered">
            <thead><tr><th>Título</th><th>Jornada</th>${esOferta ? '<th>Sueldo</th>' : ''}<th>Tipo</th><th>Acción</th></tr></thead>
            <tbody>${filas}</tbody>
          </table>
        </div>
      </div>`;
  };

  document.getElementById('tablaOfertas').innerHTML = genTabla('OFERTAS', empleos.filter(e => e.tipo === 'oferta'));
  document.getElementById('tablaDemandas').innerHTML = genTabla('DEMANDAS', empleos.filter(e => e.tipo === 'demanda'));
}

document.addEventListener('DOMContentLoaded', () => {
  gestionarNavbarSesion();
  renderTablas();
  document.getElementById('inputTipo').addEventListener('change', gestionarVisibilidadSueldo);
  document.getElementById('formEmpleos').addEventListener('submit', (e) => {
    e.preventDefault();
    const nuevo = {
      tipo: document.getElementById('inputTipo').value,
      titulo: document.getElementById('inputTitulo').value,
      jornada: document.getElementById('inputJornada').value,
      sueldo: Number(document.getElementById('inputSueldo').value) || 0,
      descripcion: document.getElementById('inputDescripcion').value
    };
    empleos.push(nuevo);
    renderTablas();
    e.target.reset();
    gestionarVisibilidadSueldo();
  });

  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-eliminar');
    if (btn) { empleos.splice(btn.dataset.indice, 1); renderTablas(); }
  });
});