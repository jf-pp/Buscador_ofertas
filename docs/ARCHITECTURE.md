# ARCHITECTURE.md

## Principio
Lo más simple que funcione sin servidor: una página estática que cualquiera puede abrir, y que en GitHub Pages funciona tal cual.

## Piezas
- `index.html` — estructura y formularios. Sin frameworks.
- `css/styles.css` — estilos propios, responsive.
- `js/app.js` — interfaz: render de la lista, formularios, localStorage, búsqueda en Mercado Libre.
- `js/pricing.js` — lógica pura (cupón, margen, clasificador de oferta). Sin DOM, para poder probarla con `node --test`.
- `data/seed.json` — 5 productos con precios verificados del 12–14 nov 2026.
- `tests/pricing.test.js` — tests con `node:test`, sin dependencias.

## Datos
- Estado en `localStorage`, clave `buscador-ofertas-mx:v1`. Al primer uso se carga `data/seed.json`.
- Exportar/importar JSON permite respaldar o mover la lista a otro navegador.
- Mercado Libre: `GET https://api.mercadolibre.com/sites/MLM/search?q=...&limit=5`, directo desde el navegador. Sin clave. Si falla, se muestra el error y se pide verificación manual.

## Decisiones clave
Ver `docs/DECISIONS.md`. En resumen: app estática en vez de backend, localStorage en vez de base de datos, API pública de Mercado Libre + verificación manual para Amazon.
