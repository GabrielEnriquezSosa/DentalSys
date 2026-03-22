import type {  Pago  } from "../entities";

export interface PagoRepository {
  registrarPago(pago: Pago, totalAbonado: number, liquidado: boolean): Promise<void>;
  obtenerPagosPorPaciente(pacienteId: string): Promise<Pago[]>;
}
