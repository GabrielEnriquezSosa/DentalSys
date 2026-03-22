import type {  Paciente  } from "../entities";
import type {  ExpedienteRepository  } from "../repositories/ExpedienteRepository";

export class GuardarExpedienteUseCase {
  private repo: ExpedienteRepository;
  constructor(repo: ExpedienteRepository) {
    this.repo = repo;}
  
  async execute(paciente: Paciente): Promise<Paciente> {
    // Aquí irían validaciones de negocio previas al guardado, ej:
    if (paciente.fichaId.edad < 0) {
      throw new Error("La edad no puede ser negativa.");
    }
    return await this.repo.guardar(paciente);
  }
}
