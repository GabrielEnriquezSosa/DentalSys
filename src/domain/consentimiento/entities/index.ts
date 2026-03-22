export interface ConsentimientoTemplate {
  id: string;
  nombreProcedimiento: string;
  descripcionProcedimiento: string;
  riesgosComplicaciones: string;
}

export interface DocumentoConsentimiento {
  pacienteNombre: string;
  medicoTratante: string;
  lugarExpedicion: string;
  fechaExpedicion: Date;
  firmaPacienteSvg: string; // Base64 o path del SVG traceado
  firmaMedicoSvg: string;
  templateAsociado: ConsentimientoTemplate;
}
