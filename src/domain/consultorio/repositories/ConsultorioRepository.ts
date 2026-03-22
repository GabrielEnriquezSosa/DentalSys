import type {  IdentidadConsultorio  } from "../entities";

export interface ConsultorioRepository {
  obtenerIdentidad(): Promise<IdentidadConsultorio | null>;
  guardarIdentidad(identidad: IdentidadConsultorio): Promise<void>;
}
