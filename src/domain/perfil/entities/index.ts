export interface PerfilMedico {
  id: string; // Puede ser el UID de autenticación
  nombreCompleto: string;
  especialidad: string;
  cedulaProfesional: string;
  telefonoCitas: string;
  universidadEgreso: string;
  domicilioConsultorio: string;
  firmaDigitalUrl: string;
}
