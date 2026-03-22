import type {  Servicio  } from "../entities";
import type {  ServicioRepository  } from "../repositories/ServicioRepository";

export class RegistrarServicioUseCase {
  private repo: ServicioRepository;
  constructor(repo: ServicioRepository) {
    this.repo = repo;}
  
  async execute(servicio: Servicio): Promise<Servicio> {
    if (servicio.monto < 0) {
      throw new Error("El monto del servicio no puede ser negativo");
    }
    if (!servicio.nombre.trim()) {
      throw new Error("El nombre del servicio es obligatorio");
    }
    
    return await this.repo.registrar(servicio);
  }
}
