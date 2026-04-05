import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./presentation/pages/Dashboard";
import { PerfilesMedicos } from "./presentation/pages/PerfilesMedicos";
import { Medicamentos } from "./presentation/pages/Medicamentos";
import { RecetaMedica } from "./presentation/pages/RecetaMedica";
import { Agenda } from "./presentation/pages/Agenda";
import { CalendarioCitas } from "./presentation/pages/CalendarioCitas";
import { Servicios } from "./presentation/pages/Servicios";
import { MiConsultorio } from "./presentation/pages/MiConsultorio";
import { RecibirPago } from "./presentation/pages/RecibirPago";
import { CertificadoMedico } from "./presentation/pages/CertificadoMedico";
import { Soporte } from "./presentation/pages/Soporte";
import { HistorialRecetas } from "./presentation/pages/HistorialRecetas";
import { ConsentimientoInformado } from "./presentation/pages/ConsentimientoInformado";
import { Presupuesto } from "./presentation/pages/Presupuesto";
import { HistorialPresupuestos } from "./presentation/pages/HistorialPresupuestos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/perfiles" element={<PerfilesMedicos />} />
        <Route path="/medicamentos" element={<Medicamentos />} />
        <Route path="/receta" element={<RecetaMedica />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/agenda/calendario" element={<CalendarioCitas />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/consultorio" element={<MiConsultorio />} />
        <Route path="/pagos" element={<RecibirPago />} />
        <Route path="/certificado" element={<CertificadoMedico />} />
        <Route path="/soporte" element={<Soporte />} />
        <Route path="/receta/historial" element={<HistorialRecetas />} />
        <Route path="/consentimiento" element={<ConsentimientoInformado />} />
        <Route path="/presupuesto" element={<Presupuesto />} />
        <Route path="/presupuesto/historial" element={<HistorialPresupuestos />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
