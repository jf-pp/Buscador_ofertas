# Prompt: verificar un precio

Verifica el precio actual de este producto en México, siguiendo `docs/VERIFICATION-RULES.md`:

- Producto: [nombre exacto, modelo, variante]
- Tienda a verificar primero: [tienda oficial]
- Otras tiendas: [lista]

Devuelve: precio actual, precio tachado si hay, fecha y hora de la verificación, URL de la ficha que abriste, si hay stock, y si el precio está por debajo del precio a batir de [precio]. Si la página no carga, dilo y marca el precio como sin verificar. No inventes precios ni apliques cupones sin leer sus términos.
