export interface Receta {
  id: string;
  folio: string;
  fecha: Date;
  medicoId: string;
  pacienteData: DatosPacienteReceta; // Nombre, Tel, Sexo, Edad, Nacimiento, Alergias
  signosVitalesData: SignosVitalesReceta;
  diagnostico: string;
  medicamentos: MedicamentoRecetado[];
  indicacionesAdicionales: string;
  proximaCita?: Date;
}

export interface MedicamentoRecetado {
  nombreId: string; // Referencia al catálogo
  dosis: string;
  frecuencia: string;
  duracion: string;
}

export interface DatosPacienteReceta {
  nombreCompleto: string;
  telefono: string;
  sexo: string;
  edad: number;
  fechaNacimiento: Date;
  alergias: string;
}

export interface SignosVitalesReceta {
  peso: number;
  talla: number;
  imc: number;
  so2: number;
  fc: number;
  fr: number;
  ta: string;
  temp: number;
}

export interface AjusteReceta {
  formato: "MediaCarta" | "Carta" | "Personalizada";
  imagenFondo?: string;
  etiquetasDinamicas: Record<string, { x: number; y: number }>;
}
