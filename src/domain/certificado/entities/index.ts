export interface CertificadoMedico {
  pacienteNombre: string;
  edad: number;
  medicoCertifica: string;
  lugarExpedicion: string;
  fechaExpedicion: Date;
  diagnostico: string; // "Omitido por motivos de privacidad" si aplica
  procedimientoRealizado: string;
  indicacionesReposo: {
    diasReposo: number;
    desde: Date;
    hasta: Date;
  };
  incluirEspaciosFirmas: boolean;
  firmaDigitalSvg?: string;
}
