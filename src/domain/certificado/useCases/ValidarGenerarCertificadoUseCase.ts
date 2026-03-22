import type {  CertificadoMedico  } from "../entities";

export class ValidarGenerarCertificadoUseCase {
  execute(certificado: CertificadoMedico): void {
    if (certificado.indicacionesReposo.diasReposo < 0) {
      throw new Error("Los días de reposo no pueden ser negativos.");
    }
    
    if (certificado.indicacionesReposo.desde > certificado.indicacionesReposo.hasta) {
      throw new Error("La fecha inicial de reposo no puede ser mayor que la final.");
    }
    
    if (!certificado.medicoCertifica) {
      throw new Error("El nombre del médico que certifica es obligatorio.");
    }
    
    // Aquí se enviaría el objeto validado a la capa de infraestructura para generar PDF
  }
}
