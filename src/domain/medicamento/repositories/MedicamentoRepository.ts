import type {  MedicamentoCatalogo  } from "../entities";

export interface MedicamentoRepository {
  registrar(medicamento: MedicamentoCatalogo): Promise<MedicamentoCatalogo>;
  cargaMasiva(medicamentos: MedicamentoCatalogo[]): Promise<void>;
  buscarPorNombre(query: string): Promise<MedicamentoCatalogo[]>;
  obtenerTodos(): Promise<MedicamentoCatalogo[]>;
}
