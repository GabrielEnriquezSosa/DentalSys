import type {  Receta  } from "../entities";
import type {  RecetaRepository  } from "../repositories/RecetaRepository";

export class GenerarRecetaUseCase {
  private repo: RecetaRepository;
  constructor(repo: RecetaRepository) {
    this.repo = repo;}
  
  async execute(receta: Receta): Promise<Receta> {
    if (receta.medicamentos.length === 0) {
      throw new Error("La receta debe incluir al menos un medicamento recetado");
    }
    
    // Generar la fecha de expedición
    receta.fecha = new Date();
    
    // Autogenerar Folio si no está seteado o es en base de datos
    if (!receta.folio) {
      receta.folio = `REC-${Date.now()}`;
    }
    
    return await this.repo.guardar(receta);
  }
}
