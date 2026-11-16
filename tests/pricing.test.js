import test from 'node:test';
import assert from 'node:assert/strict';
import { precioEfectivoConCupon, costoPorUnidades, margen, clasificarOferta } from '../js/pricing.js';

test('cupón 15% con tope de $1,000 sobre $3,949 da $3,356.65', () => {
  const r = precioEfectivoConCupon({ precioLista: 3949, porcentaje: 15, topeAhorro: 1000, minimo: 300 });
  assert.equal(r.efectivo, 3356.65);
  assert.equal(r.ahorro, 592.35);
});

test('cupón una vez por cuenta solo abarata 1 unidad de 3', () => {
  const r = costoPorUnidades({ precioLista: 3949, unidades: 3, cupon: { porcentaje: 15, topeAhorro: 1000, minimo: 300, aplicado: true } });
  assert.equal(r.total, 11254.65);
});

test('margen MSI: costo $5,189 + envío $199, cliente $5,899', () => {
  const r = margen({ costo: 5189, precioCliente: 5899, envio: 199 });
  assert.equal(r.totalCosto, 5388);
  assert.equal(r.ganancia, 511);
});

test('precio igual al precio a batir es OFERTA REAL', () => {
  const r = clasificarOferta({ precioActual: 5189, precioABatir: 6089, promedio30d: 6089 });
  assert.equal(r.etiqueta, 'OFERTA REAL');
});

test('precio igual o mayor al promedio de 30 días es REVISAR', () => {
  const r = clasificarOferta({ precioActual: 3949, precioABatir: 3450, promedio30d: 3715 });
  assert.equal(r.etiqueta, 'REVISAR');
});
