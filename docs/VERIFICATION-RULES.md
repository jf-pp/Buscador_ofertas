# VERIFICATION-RULES.md — reglas para no citar un precio como verificado

Estas reglas vienen del trabajo real de El Buen Fin 2026. Aplican a la app, a sus datos semilla y a cualquier agente que trabaje en el repo.

1. **Tienda oficial primero.** Antes de citar un precio de un revendedor o marketplace, abre la página del modelo exacto (año, Hz, variante) en la tienda oficial y anota ese precio con fecha.
2. **Un post de ofertas es solo una pista.** Un post, un TikTok o un pantallazo no prueban un precio hasta que la página del comercio lo confirma. Si dos fuentes discrepan, muestra ambas y marca el precio como sin confirmar.
3. **Cupones:** lee código, mínimo, tope de ahorro, fechas y si es una vez por cuenta. Presenta el precio con cupón como "efectivo" y di qué falta por confirmar (por ejemplo, si aplica en checkout). Un cupón de una vez por cuenta solo vale para 1 unidad.
4. **No apilar cupones** salvo que los términos lo permitan o el checkout lo confirme.
5. **Historial antes que tachado.** Un descuento es real si el precio actual está por debajo del precio a batir o del promedio reciente, no solo porque haya un precio tachado alto.
6. **Si la página no carga, el precio queda sin verificar.** No presentes la oferta como vigente.
7. **En la app:** todo precio lleva `fuente`, `fecha` y `verificado: true/false`. Nunca cambies `verificado` a true sin haber abierto la página.
