export interface Pago {
  id: string;
  pacienteId: string;
  fechaHora: Date;
  metodoPago: "Efectivo" | "Tarjeta" | "Transferencia" | "Otro";
  tipoPago: "Total" | "Parcial";
  descuentoGlobalPorcentaje: number;
  serviciosPagados: { descripcion: string; monto: number }[];
  notas: string;
}

export interface PagoCompletadoResult {
  pagoRegistrado: Pago;
  totalPagado: number;
  saldoRestanteAnterior: number;
  nuevoSaldo: number;
}
