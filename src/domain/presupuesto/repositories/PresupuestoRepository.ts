import type {  Presupuesto  } from "../entities";

export interface PresupuestoRepository {
  guardar(presupuesto: Presupuesto): Promise<Presupuesto>;
  generarPdfUrl(presupuesto: Presupuesto): Promise<string>;
}
