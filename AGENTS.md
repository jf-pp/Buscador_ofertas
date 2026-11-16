# AGENTS.md — instrucciones para agentes de IA en este repo

## El proyecto en una frase
App estática, sin build ni dependencias, para decidir si una oferta en tiendas online de México es real, comparando contra un precio a batir y un historial de precios.

## Reglas que no se rompen
1. **Nunca inventes un precio como verificado.** Un precio solo es "verificado" si se leyó en la página de la tienda, con fecha y fuente. Lo demás es "sin verificar" o "indirecto (Keepa, post, etc.)".
2. **Tienda oficial primero.** Antes de citar un precio de un revendedor o marketplace, busca el precio en la tienda oficial del mismo modelo exacto (año, Hz, variante).
3. **Un post de ofertas es solo una pista** hasta que la página del comercio lo confirma. No calcules un precio final sobre un precio sin confirmar.
4. **Cupones:** lee código, mínimo, tope, fechas y si es una vez por cuenta. Un cupón así solo abarata 1 unidad. No apiles dos cupones salvo que los términos lo permitan o el checkout lo confirme.
5. **Precios en MXN, fechas en formato ISO (YYYY-MM-DD), texto de la app en español (México).**
6. **No añadas dependencias ni CDNs.** La app debe seguir funcionando abriendo `index.html`.
7. **Lógica de precios en `js/pricing.js`,** pura y sin DOM, con test en `tests/`. La interfaz va en `js/app.js`.

## Flujo de trabajo (spec-driven)
1. Lee `docs/PRD.md` y la spec en `specs/` que toque el cambio.
2. Si el cambio añade comportamiento, actualiza primero la spec con criterios de aceptación.
3. Haz el cambio mínimo que cumpla la spec.
4. Corre `node --check` en los JS tocados y `npm test`. Si un test falla, arréglalo, no lo borres.
5. Verifica sirviendo la app (`npm start`) y abriendo la página.
6. En el resumen, di qué cambió, qué probaste y qué quedó sin verificar.

## Datos semilla
`data/seed.json` tiene precios verificados del 12–14 nov 2026 (El Buen Fin). No los actualices con precios que no hayas verificado tú en la tienda, y si lo haces, cambia `verificadoEn`, `fuente` e `historial`.

## Prompts
Usa los de `prompts/` cuando el usuario pida verificar un precio, agregar una tienda o agregar un producto.
