import type { Pago } from "../entities";
import type { PagoRepository } from "../repositories/PagoRepository";
import type { ExpedienteRepository } from "../../expediente/repositories/ExpedienteRepository";

export class ProcesarPagoUseCase {
  private pagoRepo: PagoRepository;
  private expRepo: ExpedienteRepository;
  constructor(pagoRepo: PagoRepository, expRepo: ExpedienteRepository) {
    this.pagoRepo = pagoRepo;
    this.expRepo = expRepo;
  }

  async execute(pago: Pago, montoAbonoExtra?: number): Promise<void> {
    const paciente = await this.expRepo.obtenerPorId(pago.pacienteId);
    if (!paciente) {
      throw new Error("Paciente no encontrado");
    }

    // Calcular el monto total de los servicios que se están pagando en esta transacción
    const subtotal = pago.serviciosPagados.reduce(
      (acc, obj) => acc + obj.monto,
      0,
    );
    const desc = (subtotal * pago.descuentoGlobalPorcentaje) / 100;

    // Si el tipo de pago es Total, se paga el saldo pendiente o el monto de los servicios.
    // Si es Parcial, es un abono
    const montoAbonarReal = montoAbonoExtra || subtotal - desc;

    // Añadimos la logica para actualizar saldo del paciente
    paciente.historialPagos.abonado += montoAbonarReal;
    paciente.historialPagos.saldo -= montoAbonarReal;

    // Asegurarse de que el saldo no quede negativo por error
    if (paciente.historialPagos.saldo < 0) {
      paciente.historialPagos.saldo = 0;
    }

    const liquidado = paciente.historialPagos.saldo === 0;

    // Guardar los cambios mediante repositorios
    await this.expRepo.guardar(paciente);
    await this.pagoRepo.registrarPago(pago, montoAbonarReal, liquidado);
  }
}
