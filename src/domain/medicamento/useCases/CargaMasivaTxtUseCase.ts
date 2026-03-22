import type {  MedicamentoCatalogo  } from "../entities";
import type {  MedicamentoRepository  } from "../repositories/MedicamentoRepository";

export class CargaMasivaTxtUseCase {
  private repo: MedicamentoRepository;
  constructor(repo: MedicamentoRepository) {
    this.repo = repo;}
  
  async execute(contenidoTxt: string): Promise<void> {
    const lineas = contenidoTxt.split('\n');
    const medicamentos: MedicamentoCatalogo[] = [];
    
    for (const linea of lineas) {
      if (!linea.trim()) continue;
      
      const partes = linea.split('|');
      if (partes.length >= 3) {
        medicamentos.push({
          id: `MED-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          nombre: partes[0].trim(),
          categoriaTerapeutica: partes[1].trim(),
          usoPrincipal: partes[2].trim()
        });
      }
    }
    
    if (medicamentos.length > 0) {
      await this.repo.cargaMasiva(medicamentos);
    } else {
      throw new Error("El archivo no contenía registros válidos. Formato esperado: Nombre|Categoría|Uso");
    }
  }
}
