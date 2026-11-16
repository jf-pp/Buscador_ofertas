# Buscador de ofertas MX

¿Es oferta de verdad? Esta app te ayuda a decidirlo antes de comprar en tiendas online de México: guardas un producto con su **precio a batir**, registras su historial y la app te dice si el precio actual es una oferta real o solo parece serlo.

Nació del trabajo real de El Buen Fin 2026: comparar monitores en mi.com/mx, Cyberpuerta, Liverpool, DDTECH, Mercado Libre, Amazon México y TikTok Shop, con cupones y precio a batir por producto.

## Usarlo en 1 minuto

1. Abre `index.html` en tu navegador, o sirve la carpeta: `npm start` (abre http://localhost:8000).
2. Ya vienen 5 monitores precargados con precios verificados del 12–14 nov 2026.
3. Agrega un producto con su precio a batir, o busca en Mercado Libre México desde la app.
4. Registra cada precio que verifiques en su historial. La etiqueta cambia sola.

No hay cuentas ni servidor: tus datos quedan en tu navegador (localStorage). Puedes exportarlos e importarlos en JSON.

## Qué hace

- **Lista de seguimiento:** nombre, tienda, URL, precio actual, tachado, precio a batir y promedio de 30 días.
- **Historial de precios** por producto, con fuente y si fue verificado en la página de la tienda.
- **Detector de oferta falsa:** `OFERTA REAL` solo si está a tu precio a batir o por debajo; `REVISAR` si está igual o arriba del promedio de 30 días, o si el descuento vs tachado es menor al 5%.
- **Búsqueda en Mercado Libre México** con su API pública (`sites/MLM`). Si falla, la app te pide verificar manual, nunca inventa un precio.
- **Calculadora de cupón y margen:** % o monto, tope de ahorro y mínimo. Un cupón de una vez por cuenta solo abarata 1 unidad; las demás van a precio de lista. Calcula también el margen para compra-venta (costo + envío vs precio a cliente).

## Precios semilla (verificados, no en vivo)

| Producto | Tienda | Precio | Precio a batir | Verificado |
|---|---|---:|---:|---|
| Xiaomi G27Qi 2026 | mi.com/mx | $3,949 | $3,450 | 14 nov 2026 |
| MSI MAG 274QRFW X32 | Cyberpuerta | $5,189 | $6,089 | 14 nov 2026 |
| LG UltraGear OLED 27GX704A-B | Liverpool | $7,999.20 | $7,999.20 | 14 nov 2026 |
| Gigabyte GS27QA | DDTECH | $2,799 | $2,799 | 13 nov 2026 |
| Xiaomi Mini LED G Pro 27Qi 2026 | mi.com/mx | $6,033 | $6,119.10 | 13 nov 2026 |

El cupón de Buen Fin del Xiaomi (15%, tope $1,000) daba $3,356.65 efectivo para 1 unidad. El precio de Amazon México ($3,199) es indirecto, vía Keepa: la ficha no cargó, así que vendedor y stock no están confirmados.

## Limitaciones honestas

- Amazon México suele bloquear la lectura directa: ahí la app no inventa precios, te pide verificar en la ficha o en Keepa y anotar la fuente.
- Un post de ofertas, un TikTok o un pantallazo son solo una pista hasta que la página del comercio lo confirma.
- Los precios se mueven en el día (el Xiaomi subió $499 en una tarde). Re-verifica antes de comprar.

## Metodología actual para trabajar con IA

Este repo está hecho para trabajarse con un agente de IA, no solo para leerse:

- `AGENTS.md` — instrucciones para cualquier agente que trabaje en el repo.
- `.github/copilot-instructions.md` — lo mismo, resumido para Copilot.
- `docs/PRD.md` — qué problema resuelve y para quién.
- `docs/ARCHITECTURE.md` — cómo está armado y por qué.
- `docs/DECISIONS.md` — decisiones (ADRs).
- `docs/VERIFICATION-RULES.md` — reglas para no citar un precio como verificado sin comprobarlo.
- `specs/001-watchlist.md` — especificación con historias de usuario y criterios de aceptación.
- `prompts/` — prompts reutilizables: verificar un precio, agregar una tienda, agregar un producto.
- `.github/workflows/ci.yml` — en cada cambio valida la sintaxis JS y corre los tests.

Flujo recomendado: **especifica primero** (actualiza `specs/`), luego pide el cambio citando la spec, luego pide que lo pruebe (`npm test`) y que lo verifique en el navegador. No aceptes un precio nuevo sin su fuente y su fecha.

## Desarrollo

```bash
npm test    # tests de la lógica de precios (node:test, sin dependencias)
npm start   # sirve la app en http://localhost:8000
```

Estructura: `index.html`, `css/styles.css`, `js/app.js` (interfaz), `js/pricing.js` (lógica pura y testeable), `data/seed.json`, `tests/`.

## Licencia

MIT. Autor: jf-pp.
