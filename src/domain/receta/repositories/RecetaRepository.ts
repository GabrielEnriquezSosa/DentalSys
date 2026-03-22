import type {  AjusteReceta, Receta  } from "../entities";

export interface RecetaRepository {
  guardar(receta: Receta): Promise<Receta>;
  obtenerHistorial(medicoId?: string, pacienteNombre?: string): Promise<Receta[]>;
  guardarAjustes(ajustes: AjusteReceta): Promise<void>;
  obtenerAjustes(): Promise<AjusteReceta>;
}
