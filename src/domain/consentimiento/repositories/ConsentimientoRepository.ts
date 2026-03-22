import type {  ConsentimientoTemplate  } from "../entities";

export interface ConsentimientoRepository {
  guardarTemplate(template: ConsentimientoTemplate): Promise<ConsentimientoTemplate>;
  obtenerTemplates(): Promise<ConsentimientoTemplate[]>;
}
