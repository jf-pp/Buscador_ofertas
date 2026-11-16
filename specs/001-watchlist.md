# Spec 001 — Lista de seguimiento (watchlist)

## Historias de usuario
- Como comprador, quiero guardar un producto con su precio a batir, para saber si el precio actual es oferta sin tener que recordar el precio anterior.
- Como comprador, quiero registrar cada precio que verifico con fecha y fuente, para ver si el precio sube o baja en el tiempo.
- Como revendedor, quiero calcular el precio efectivo con cupón y mi margen, para no vender por debajo de mi costo.

## Criterios de aceptación
1. Al abrir la app por primera vez, se ven los 5 productos semilla con su etiqueta de oferta.
2. Agregar un producto lo muestra en la lista sin recargar y persiste al recargar la página.
3. Un producto con precio actual <= precio a batir muestra `OFERTA REAL`; uno >= promedio de 30 días muestra `REVISAR`.
4. Registrar un precio añade una entrada al historial con la fecha de hoy.
5. Exportar descarga un JSON con los productos; importar ese JSON restaura la lista.
6. La búsqueda de Mercado Libre muestra resultados con precio y enlace, o un mensaje claro si falla.
7. La calculadora de cupón con 15% y tope $1,000 sobre $3,949 da $3,356.65 para 1 unidad, y $11,254.65 por 3 unidades (cupón solo en la primera).

## Fuera de alcance
Comprar, pagar, alertas automáticas y scraping de Amazon.
