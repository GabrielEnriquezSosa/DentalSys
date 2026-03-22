import type {  PerfilMedico  } from "../entities";

export interface PerfilMedicoRepository {
  obtenerPerfil(id: string): Promise<PerfilMedico | null>;
  guardarPerfil(perfil: PerfilMedico): Promise<void>;
}
