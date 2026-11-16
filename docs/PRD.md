# PRD — Buscador de ofertas MX

## Problema
En El Buen Fin y otras ventas, una tienda puede subir el precio tachado o subir el precio en el día, y un "descuento" deja de serlo. Josué compraba en Mercado Libre, Amazon México, Cyberpuerta, Liverpool, mi.com/mx y TikTok Shop y necesitaba saber, antes de pagar, si el precio era real comparado con lo que ese producto costaba antes.

## Usuario
Una persona en México que sigue pocos productos (monitores, PC, etc.), compara entre tiendas y a veces revende. No quiere una cuenta ni un servidor: quiere abrir algo, ver su lista y decidir.

## Qué resuelve (v1)
1. Guardar productos con precio a batir por tienda.
2. Registrar el historial de cada precio con fecha, fuente y si fue verificado.
3. Decir si el precio actual es oferta real, está por encima o hay que revisarlo, con la razón en texto claro.
4. Buscar en Mercado Libre México con su API pública y añadir el resultado a la lista.
5. Calcular el precio efectivo con cupón (con tope y una vez por cuenta) y el margen de reventa.

## Fuera de alcance (v1)
- Comprar o pagar dentro de la app.
- Scraping de Amazon (bloquea la lectura directa) o de tiendas sin API pública.
- Alertas automáticas o cuentas multiusuario. Los datos viven en el navegador.

## Criterios de éxito
- Abrir `index.html` y ver la lista con los 5 monitores semilla sin instalar nada.
- Agregar un producto y ver su etiqueta de oferta sin recargar.
- Un precio sin fuente verificada nunca se muestra como "verificado".
- `npm test` en verde.
