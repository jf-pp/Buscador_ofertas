import { precioEfectivoConCupon, costoPorUnidades, margen, clasificarOferta, descuentoVsTachado } from './pricing.js';

const CLAVE = 'buscador-ofertas-mx:v1';
const $ = (s) => document.querySelector(s);
const mxn = (n) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(n ?? 0);

let productos = [];
try { productos = JSON.parse(localStorage.getItem(CLAVE)) ?? []; } catch { productos = []; }
if (!productos.length) {
  const r = await fetch('data/seed.json').catch(() => null);
  if (r?.ok) { productos = (await r.json()).productos; guardar(); }
}
function guardar() { localStorage.setItem(CLAVE, JSON.stringify(productos)); }

function tarjeta(p) {
  const c = clasificarOferta(p);
  const desc = p.precioTachado ? descuentoVsTachado(p) : null;
  const hist = (p.historial ?? []).map(h => `<li>${h.fecha} — ${mxn(h.precio)} — ${h.fuente}${h.verificado ? ' ✓' : ' (sin verificar)'}</li>`).join('');
  return `<article class="tarjeta">
    <span class="etiqueta ${c.nivel}">${c.etiqueta}</span>
    <h3>${p.nombre}</h3>
    <p>${p.detalle ?? ''} · ${p.tienda}</p>
    <p class="precio">${mxn(p.precioActual)}</p>
    <p>Precio a batir: <strong>${mxn(p.precioABatir)}</strong>${desc !== null ? ` · ${desc}% vs tachado ${mxn(p.precioTachado)}` : ''}</p>
    <p>${c.explicacion}</p>
    <p class="fuente">Fuente: ${p.fuente ?? 'sin fuente'} · ${p.verificado ? 'Verificado' : 'Sin verificar'}${p.verificadoEn ? ' el ' + p.verificadoEn : ''}</p>
    ${p.url ? `<p><a href="${p.url}" target="_blank" rel="noopener">Ver en la tienda</a></p>` : ''}
    ${hist ? `<details><summary>Historial de precios</summary><ul class="historial">${hist}</ul></details>` : ''}
    <button data-registrar="${p.id}">Registrar precio actual en historial</button>
    <button data-eliminar="${p.id}">Eliminar</button>
  </article>`;
}

function render() {
  const q = ($('#filtro').value || '').toLowerCase();
  const orden = $('#orden').value;
  let lista = productos.filter(p => (p.nombre + ' ' + p.tienda).toLowerCase().includes(q));
  if (orden === 'precio-asc') lista = [...lista].sort((a, b) => a.precioActual - b.precioActual);
  if (orden === 'precio-desc') lista = [...lista].sort((a, b) => b.precioActual - a.precioActual);
  if (orden === 'descuento') lista = [...lista].sort((a, b) => (a.precioActual - a.precioABatir) - (b.precioActual - b.precioABatir));
  $('#lista').innerHTML = lista.length ? lista.map(tarjeta).join('') : '<p>No hay productos que coincidan. Agrega uno abajo.</p>';
}
$('#filtro').addEventListener('input', render);
$('#orden').addEventListener('change', render);
$('#lista').addEventListener('click', (e) => {
  const del = e.target.dataset.eliminar;
  const reg = e.target.dataset.registrar;
  if (del) { productos = productos.filter(p => p.id !== del); guardar(); render(); }
  if (reg) {
    const p = productos.find(x => x.id === reg);
    p.historial = p.historial ?? [];
    p.historial.push({ fecha: new Date().toISOString().slice(0, 10), precio: p.precioActual, fuente: p.tienda, verificado: false });
    guardar(); render();
  }
});

$('#form-producto').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const p = {
    id: 'p-' + Date.now(), nombre: f.get('nombre'), tienda: f.get('tienda'), url: f.get('url') || '',
    precioActual: Number(f.get('precioActual')), precioTachado: Number(f.get('precioTachado')) || null,
    precioABatir: Number(f.get('precioABatir')), promedio30d: Number(f.get('promedio30d')) || null,
    categoria: f.get('categoria') || 'General', verificado: f.get('verificado') === 'on',
    fuente: 'Captura manual', historial: [{ fecha: new Date().toISOString().slice(0, 10), precio: Number(f.get('precioActual')), fuente: f.get('tienda'), verificado: f.get('verificado') === 'on' }],
  };
  productos.push(p); guardar(); render(); e.target.reset();
});

$('#form-ml').addEventListener('submit', async (e) => {
  e.preventDefault();
  const q = $('#q-ml').value.trim();
  const box = $('#resultados-ml');
  box.textContent = 'Buscando en Mercado Libre…';
  try {
    const r = await fetch(`https://api.mercadolibre.com/sites/MLM/search?q=${encodeURIComponent(q)}&limit=5`);
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const d = await r.json();
    if (!d.results?.length) { box.textContent = 'Sin resultados en Mercado Libre para esa búsqueda.'; return; }
    box.innerHTML = d.results.map(x => `<article class="tarjeta"><h3>${x.title}</h3><p class="precio">${mxn(x.price)}</p><p>${x.seller?.nickname ?? 'Vendedor no indicado'} · ${x.condition === 'new' ? 'Nuevo' : 'Usado'}</p><p><a href="${x.permalink}" target="_blank" rel="noopener">Ver en Mercado Libre</a></p><button data-ml='${JSON.stringify({ nombre: x.title, precio: x.price, url: x.permalink })}'>Añadir a mi lista</button></article>`).join('') + '<p class="fuente">Verifica vendedor, envío y precio en la ficha antes de comprar. Esto es una búsqueda, no una verificación de oferta.</p>';
  } catch (err) { box.textContent = 'No se pudo consultar Mercado Libre ahora. Verifica manual en la tienda.'; }
});
$('#resultados-ml').addEventListener('click', (e) => {
  const raw = e.target.dataset.ml; if (!raw) return;
  const x = JSON.parse(raw);
  productos.push({ id: 'ml-' + Date.now(), nombre: x.nombre, tienda: 'Mercado Libre', url: x.url, precioActual: x.precio, precioTachado: null, precioABatir: x.precio, promedio30d: null, categoria: 'General', verificado: false, fuente: 'API pública Mercado Libre (MLM)', historial: [{ fecha: new Date().toISOString().slice(0, 10), precio: x.precio, fuente: 'Mercado Libre', verificado: false }] });
  guardar(); render();
});

$('#form-cupon').addEventListener('submit', (e) => {
  e.preventDefault();
  const costo = Number($('#costo').value), pct = Number($('#pct').value), tope = Number($('#tope').value);
  const unidades = Number($('#unidades').value), cliente = Number($('#cliente').value), envio = Number($('#envio').value);
  const cupon = precioEfectivoConCupon({ precioLista: costo, porcentaje: pct, topeAhorro: tope, minimo: 0 });
  const porUnidades = costoPorUnidades({ precioLista: costo, unidades, cupon: { porcentaje: pct, topeAhorro: tope, minimo: 0, aplicado: cupon.aplicado } });
  const m = margen({ costo: porUnidades.total / unidades, precioCliente: cliente, envio });
  $('#resultado-cupon').innerHTML = `<p>Precio efectivo (1 unidad): <strong>${mxn(cupon.efectivo)}</strong> · ahorro ${mxn(cupon.ahorro)}.</p><p>Costo total por ${unidades} unidad(es): <strong>${mxn(porUnidades.total)}</strong>.</p><p>Margen a cliente ${mxn(cliente)} con envío ${mxn(envio)}: <strong>${mxn(m.ganancia)}</strong> (${m.porcentaje}%).</p>`;
});

$('#btn-exportar').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify({ productos }, null, 2)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'buscador-ofertas.json'; a.click();
});
$('#input-importar').addEventListener('change', async (e) => {
  const f = e.target.files[0]; if (!f) return;
  const d = JSON.parse(await f.text()); if (Array.isArray(d.productos)) { productos = d.productos; guardar(); render(); }
});
$('#btn-restaurar').addEventListener('click', async () => {
  const r = await fetch('data/seed.json'); productos = (await r.json()).productos; guardar(); render();
});
render();
