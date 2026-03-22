import type {  Cita  } from "../entities";
import type {  CitaRepository  } from "../repositories/CitaRepository";

export class AgendarCitaUseCase {
  private repo: CitaRepository;
  constructor(repo: CitaRepository) {
    this.repo = repo;}
  
  async execute(cita: Cita): Promise<Cita> {
    const inicioD = cita.fechaHoraInicio;
    const finD = new Date(inicioD.getTime() + cita.duracionMinutos * 60000);
    
    // Validar conflicto de horarios
    const superpuestas = await this.repo.obtenerCitasRango(inicioD, finD);
    if (superpuestas.length > 0) {
      // Filtrar citas que estén canceladas, si es que la consulta devuelve todo el histórico
      const activas = superpuestas.filter(c => c.estado === 'Programada');
      if (activas.length > 0) {
         throw new Error("El horario seleccionado entra en conflicto con otra cita registrada.");
      }
    }
    
    return await this.repo.agendar(cita);
  }
}
