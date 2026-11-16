// pricing.js — lógica pura, sin DOM. Se puede probar con `node --test tests/`.
// Todas las cantidades son MXN, salvo que se indique lo contrario.

export function precioEfectivoConCupon({ precioLista, porcentaje = 0, montoFijo = 0, topeAhorro = null, minimo = 0 }) {
  if (precioLista < minimo) return { efectivo: precioLista, ahorro: 0, aplicado: false, motivo: 'No alcanza el mínimo del cupón.' };
  let ahorro = (precioLista * porcentaje) / 100 + montoFijo;
  if (topeAhorro !== null && ahorro > topeAhorro) ahorro = topeAhorro;
  ahorro = Math.min(ahorro, precioLista);
  return { efectivo: round2(precioLista - ahorro), ahorro: round2(ahorro), aplicado: ahorro > 0, motivo: ahorro > 0 ? '' : 'El cupón no genera ahorro.' };
}

// Un cupón "una vez por cuenta" solo abarata 1 unidad. Las demás van a precio de lista.
export function costoPorUnidades({ precioLista, unidades = 1, cupon = null }) {
  if (!cupon || !cupon.aplicado) return { total: round2(precioLista * unidades), porUnidad: precioLista, ahorroTotal: 0 };
  const primera = precioEfectivoConCupon({ precioLista, ...cupon });
  const total = round2(primera.efectivo + precioLista * (unidades - 1));
  return { total, porUnidad: round2(total / unidades), ahorroTotal: round2(precioLista * unidades - total) };
}

export function margen({ costo, precioCliente, envio = 0 }) {
  const totalCosto = round2(costo + envio);
  const ganancia = round2(precioCliente - totalCosto);
  const porcentaje = totalCosto > 0 ? round2((ganancia / totalCosto) * 100) : 0;
  return { totalCosto, ganancia, porcentaje };
}

// Clasificador de oferta. Nunca llama "real" a un descuento solo por el precio tachado.
export function clasificarOferta({ precioActual, precioABatir = null, promedio30d = null, precioTachado = null }) {
  if (precioABatir !== null && precioActual <= precioABatir) {
    return { etiqueta: 'OFERTA REAL', nivel: 'real', explicacion: `Está a $${precioActual} o por debajo de tu precio a batir ($${precioABatir}).` };
  }
  if (promedio30d !== null && precioActual >= promedio30d) {
    return { etiqueta: 'REVISAR', nivel: 'sospechosa', explicacion: `Cuesta $${precioActual}, igual o más que el promedio de 30 días ($${promedio30d}). No es una baja real aunque haya precio tachado.` };
  }
  if (precioTachado !== null && precioActual >= precioTachado * 0.95) {
    return { etiqueta: 'REVISAR', nivel: 'sospechosa', explicacion: `El descuento frente al precio tachado ($${precioTachado}) es menor al 5%. Verifica en la tienda oficial.` };
  }
  if (precioABatir !== null) {
    return { etiqueta: 'POR ENCIMA', nivel: 'encima', explicacion: `Está $${round2(precioActual - precioABatir)} por encima de tu precio a batir ($${precioABatir}).` };
  }
  return { etiqueta: 'SIN REFERENCIA', nivel: 'sin-ref', explicacion: 'Falta un precio a batir o un promedio para juzgar si es oferta.' };
}

export function descuentoVsTachado({ precioActual, precioTachado }) {
  if (!precioTachado || precioTachado <= 0) return null;
  return round2(((precioTachado - precioActual) / precioTachado) * 100);
}

export function round2(n) { return Math.round(n * 100) / 100; }
