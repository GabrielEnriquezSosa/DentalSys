import type {  Paciente, NotaMedica, DienteOdontograma  } from "../entities";

export interface ExpedienteRepository {
  obtenerPorId(id: string): Promise<Paciente | null>;
  buscarPorNombre(query: string): Promise<Paciente[]>;
  guardar(paciente: Paciente): Promise<Paciente>;
  agregarNotaMedica(pacienteId: string, nota: NotaMedica): Promise<void>;
  actualizarOdontograma(pacienteId: string, odontograma: DienteOdontograma[]): Promise<void>;
}
