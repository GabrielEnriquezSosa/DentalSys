import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./presentation/pages/Dashboard";
import { PerfilesMedicos } from "./presentation/pages/PerfilesMedicos";
import { Medicamentos } from "./presentation/pages/Medicamentos";
import { RecetaMedica } from "./presentation/pages/RecetaMedica";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/perfiles" element={<PerfilesMedicos />} />
        <Route path="/medicamentos" element={<Medicamentos />} />
        <Route path="/receta" element={<RecetaMedica />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
