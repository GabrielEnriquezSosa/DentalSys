import type {  TratamientoRecomendado  } from "../entities";
import type {  ExpedienteRepository  } from "../repositories/ExpedienteRepository";

export class AgregarTratamientoUseCase {
  private repo: ExpedienteRepository;
  constructor(repo: ExpedienteRepository) {
    this.repo = repo;}
  
  async execute(pacienteId: string, tratamiento: TratamientoRecomendado): Promise<void> {
    const paciente = await this.repo.obtenerPorId(pacienteId);
    if (!paciente) {
      throw new Error("Paciente no encontrado");
    }
    
    // Agregar el tratamiento a la lista
    paciente.tratamientosRecomendados.push(tratamiento);
    
    // Actualizar los saldos del paciente automáticamente
    paciente.historialPagos.total += tratamiento.precio;
    paciente.historialPagos.saldo += tratamiento.precio;
    
    await this.repo.guardar(paciente);
  }
}
