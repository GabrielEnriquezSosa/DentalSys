import type {  Servicio  } from "../entities";

export interface ServicioRepository {
  obtenerTodos(): Promise<Servicio[]>;
  registrar(servicio: Servicio): Promise<Servicio>;
  eliminar(id: string): Promise<void>;
}
