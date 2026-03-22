export type SistemaCuerpo = 'digestivo' | 'respiratorio' | 'cardiovascular' | 'genitourinario' | 'endocrino' | 'nervioso';

export interface Paciente {
  id: string;
  medicoTratanteId: string;
  fichaId: FichaIdentificacion;
  antecedentesHeredo: AntecedentesHeredofamiliares;
  antecedentesNoPatologicos: AntecedentesNoPatologicos;
  antecedentesPatologicos: AntecedentesPatologicos;
  padecimientoActual: PadecimientoActual;
  interrogatorioSistemas: Record<SistemaCuerpo, boolean>;
  exploracionFisica: ExploracionFisica;
  exploracionExtraoral: ExploracionExtraoral;
  exploracionIntraoral: ExploracionIntraoral;
  exploracionTejidosDuros: ExploracionTejidosDuros;
  analisisOclusion: AnalisisOclusion;
  examenParodontal: ExamenParodontal;
  odontograma: DienteOdontograma[];
  archivosAuxiliares: ArchivoAuxiliar[];
  diagnosticoGeneral: string;
  tratamientosRecomendados: TratamientoRecomendado[];
  historialNotas: NotaMedica[];
  historialPagos: HistorialPagoResumen;
}

export interface FichaIdentificacion {
  nombre: string;
  tutor?: string;
  fechaNacimiento: Date;
  edad: number;
  sexo: "Masculino" | "Femenino" | "Otro";
  estadoCivil: string;
  origen: string;
  tipoSangre: string;
  gradoEstudios: string;
  domicilio: string;
  telefono: string;
  email: string;
}

export interface AntecedentesHeredofamiliares {
  enfermedades: string[];
  detalles: string;
}

export interface AntecedentesNoPatologicos {
  higieneOralCaracteristicas: string;
  dieta: string;
  habitosToxicos: string[];
  viviendaYMedio: string;
  laborales: string;
  actividadFisicaDescanso: string;
  vacunas: string[];
}

export interface AntecedentesPatologicos {
  infancia: string[];
  sistemicasActuales: string[];
  oncologicas: string;
  quirurgicas: string;
  farmacologicos: string[];
  traumaticos: string;
  transfusionales: string;
  alergias: string;
}

export interface PadecimientoActual {
  motivoConsulta: string;
  semiologiaDolor: string;
  sintomasAcompanantes: string[];
  evolucionActual: string;
}

export interface ExploracionFisica {
  tensionArterial: string;
  frecuenciaCardiaca: number;
  frecuenciaRespiratoria: number;
  temperatura: number;
  peso: number;
  talla: number;
  saturacionOxigeno: number;
  imc: number;
}

export interface ExploracionExtraoral {
  habitusExterior: string;
  cara: string;
  craneo: string;
  cuello: string;
  atm: string;
  ganglios: string;
}

export interface ExploracionIntraoral {
  labios: string;
  carrillos: string;
  lengua: string;
  pisoBoca: string;
  paladar: string;
  encia: string;
}

export interface ExploracionTejidosDuros {
  esmalte: string;
  dentina: string;
  pulpa: string;
  raiz: string;
  estructuraOsea: string;
}

export interface AnalisisOclusion {
  clasificacionAngle: string;
  relacionIncisiva: string;
  espaciosMaloclusiones: string;
  dinamicaFuncion: string;
}

export interface ExamenParodontal {
  pdb: string;
  sarro: string;
  bolsaParodontal: string;
  gingivitis: string;
  movilidad: string;
}

export interface DienteOdontograma {
  indiceDiente: number;
  cuadrante: number;
  caras: Record<"vestibular"|"lingual"|"mesial"|"distal"|"oclusal", string>;
  comentario: string;
}

export interface TratamientoRecomendado {
  id: string;
  tratamientoId: string;
  descripcion: string;
  precio: number;
  estado: "Pendiente" | "Realizado";
}

export interface ArchivoAuxiliar {
  id: string;
  url: string;
  tipo: string;
}

export interface NotaMedica {
  id: string;
  fecha: Date;
  accion: string;
  precioGenerado: number;
}

export interface HistorialPagoResumen {
  total: number;
  abonado: number;
  saldo: number;
}
