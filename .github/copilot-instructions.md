# Copilot instructions

App estática sin build ni dependencias para decidir si una oferta en México es real, contra un precio a batir y un historial de precios.

- Nunca presentes un precio como verificado sin haberlo leído en la página de la tienda, con fecha y fuente.
- Comprueba primero la tienda oficial del modelo exacto antes de citar un revendedor o marketplace.
- Un post de ofertas es solo una pista hasta que la página del comercio lo confirma.
- Un cupón de una vez por cuenta solo abarata 1 unidad; no apiles cupones salvo que los términos lo permitan.
- Precios en MXN, fechas ISO, español (México). Sin dependencias ni CDNs.
- Lógica de precios en `js/pricing.js` (pura, testeable); interfaz en `js/app.js`.
- Antes de un cambio, lee `AGENTS.md` y la spec en `specs/`; después, corre `npm test`.
