import type {  Cita  } from "../entities";

export interface CitaRepository {
  agendar(cita: Cita): Promise<Cita>;
  obtenerCitasRango(inicio: Date, fin: Date): Promise<Cita[]>;
  actualizarEstado(id: string, estado: string): Promise<void>;
}
