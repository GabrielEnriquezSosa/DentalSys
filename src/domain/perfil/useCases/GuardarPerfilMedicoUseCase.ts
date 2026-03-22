import type {  PerfilMedico  } from "../entities";
import type {  PerfilMedicoRepository  } from "../repositories/PerfilMedicoRepository";

export class GuardarPerfilMedicoUseCase {
  private repo: PerfilMedicoRepository;
  constructor(repo: PerfilMedicoRepository) {
    this.repo = repo;}
  
  async execute(perfil: PerfilMedico): Promise<void> {
    if (!perfil.cedulaProfesional) {
      throw new Error("La Cédula Profesional es un campo obligatorio.");
    }
    if (!perfil.nombreCompleto) {
      throw new Error("El nombre del médico es obligatorio.");
    }
    await this.repo.guardarPerfil(perfil);
  }
}
