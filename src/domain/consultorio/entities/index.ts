export interface IdentidadConsultorio {
  id: string;
  logoClinicaUrl: string;
  logoUniversidadUrl: string;
  nombreClinica: string;
  domicilioFiscal: string;
  telefonoPrincipal: string;
  telefonoSecundario?: string;
  correo: string;
  paletaColores: {
    encabezado: string;
    piePagina: string;
    tablas: string;
    enfasis: string;
    textoGeneral: string;
  };
}
