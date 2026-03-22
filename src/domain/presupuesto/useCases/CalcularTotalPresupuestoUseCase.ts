import type {  Presupuesto, TotalPresupuestoResult  } from "../entities";

export class CalcularTotalPresupuestoUseCase {
  execute(presupuesto: Presupuesto): TotalPresupuestoResult {
    // Se suma el monto de todos los items en el presupuesto
    const subtotal = presupuesto.items.reduce((acc, item) => acc + item.monto, 0);
    
    // Se calcula el porcentaje de descuento
    const descuentoNum = (subtotal * presupuesto.porcentajeDescuento) / 100;
    
    // El total final
    const total = subtotal - descuentoNum;
    
    return { subtotal, descuentoNum, total };
  }
}
