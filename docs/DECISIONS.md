# DECISIONS.md (ADRs)

## ADR-001 — App estática, sin backend ni build
**Decisión:** HTML + CSS + JS vanilla, sin frameworks, sin paso de build.
**Por qué:** Josué debe poder abrirla con doble clic o en GitHub Pages sin instalar nada ni pagar un servidor. El trabajo real era comparar precios, no mantener infraestructura.
**Consecuencia:** No hay alertas automáticas ni multiusuario; los datos viven en cada navegador.

## ADR-002 — localStorage en vez de base de datos
**Decisión:** Guardar la lista en localStorage, con exportar/importar JSON.
**Por qué:** Sin cuentas ni backend, es lo más simple que persiste entre visitas.
**Consecuencia:** Si se borran los datos del navegador, se pierde la lista salvo que se haya exportado.

## ADR-003 — Mercado Libre por API pública, Amazon por verificación manual
**Decisión:** Consultar Mercado Libre con su API pública (`sites/MLM`) y no intentar scrapear Amazon.
**Por qué:** Amazon México bloquea la lectura directa de sus fichas de forma repetida; inventar o forzar ese precio sería peor que no tenerlo.
**Consecuencia:** Para Amazon la app solo guarda lo que el usuario verifica y anota, con su fuente y fecha.

## ADR-004 — Lógica de precios separada y testeable
**Decisión:** `js/pricing.js` pura, sin DOM, con tests en `tests/` usando solo `node:test`.
**Por qué:** El cálculo de cupón con tope y de margen es donde un error cuesta dinero real. Debe probarse sin abrir el navegador.
