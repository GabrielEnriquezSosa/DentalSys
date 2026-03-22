export interface Presupuesto {
  id: string;
  pacienteProspecto: string;
  fechaCreacion: Date;
  items: ItemPresupuesto[];
  porcentajeDescuento: number;
  vigenciaDias: number;
  notasExtra?: string;
}

export interface ItemPresupuesto {
  servicioId?: string;
  descripcion: string;
  monto: number;
}

export interface TotalPresupuestoResult {
  subtotal: number;
  descuentoNum: number;
  total: number;
}
