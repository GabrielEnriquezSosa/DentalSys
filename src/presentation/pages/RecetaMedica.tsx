import { Layout } from "../components/Layout/Layout";
import { 
  FileText, 
  History, 
  Settings, 
  Lock, 
  User, 
  Activity, 
  Plus, 
  Search, 
  X, 
  AlertTriangle,
  Calendar as CalendarIcon,
  Info,
  Printer
} from "lucide-react";

export const RecetaMedica = () => {
  return (
    <Layout>
      <div className="dashboard-container">
        {/* Breadcrumbs & Header Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <div className="breadcrumbs">
              PACIENTES / <span>NUEVA RECETA</span>
            </div>
            <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              Nueva Receta Médica
              <FileText size={24} color="#94a3b8" />
            </h1>
          </div>
          <div className="page-header-actions">
            <button className="btn-outline-pink">
              <History size={16} /> Ver Hist. de Consultas
            </button>
            <button className="btn-outline-gray">
              <Settings size={16} /> Ajustes Receta
            </button>
          </div>
        </div>

        {/* Top Cards Row: Médico / Paciente */}
        <div className="row-cards">
          <div className="form-card card-40" style={{ padding: '24px' }}>
            <h2 className="section-icon-title">
              <Lock size={20} color="#0ea5e9" />
              Datos del Médico
            </h2>
            <div className="form-group">
              <label className="form-label">MÉDICO TRATANTE</label>
              <select className="form-input" defaultValue="Dr. Smith (Odontología General)">
                <option>Dr. Smith (Odontología General)</option>
                <option>Dra. Martínez (Ortodoncia)</option>
              </select>
            </div>
            <div className="alert-box alert-warning">
              <AlertTriangle size={20} />
              <span>Asegúrese de que el folio de la receta coincida con el rango autorizado por la clínica para este médico.</span>
            </div>
          </div>

          <div className="form-card card-60" style={{ padding: '24px' }}>
            <h2 className="section-icon-title">
              <User size={20} color="#0ea5e9" />
              Datos del Paciente
            </h2>
            
            <div className="form-row" style={{ marginBottom: '16px' }}>
              <div className="form-group">
                <label className="form-label">NOMBRE COMPLETO</label>
                <input type="text" className="form-input" defaultValue="Juan Pérez López" readOnly style={{ backgroundColor: '#f8fafc', fontWeight: 600 }} />
              </div>
              <div className="form-group">
                <label className="form-label">TELÉFONO</label>
                <input type="text" className="form-input" defaultValue="+52 555-0123" readOnly style={{ backgroundColor: '#f8fafc', fontWeight: 600 }} />
              </div>
            </div>

            <div className="form-row" style={{ marginBottom: '16px' }}>
              <div className="form-group">
                <label className="form-label">GÉNERO</label>
                <div className="toggle-group">
                  <button className="btn-toggle active">Masculino</button>
                  <button className="btn-toggle">Femenino</button>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">EDAD / FECHA NAC.</label>
                <input type="text" className="form-input" defaultValue="28 años (12/05/1995)" readOnly style={{ backgroundColor: '#f8fafc', fontWeight: 600 }} />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">ALERGIAS CONOCIDAS</label>
              <div className="chips-container">
                <div className="chip chip-red">PENICILINA <X size={12} /></div>
                <div className="chip chip-red">LÁTEX <X size={12} /></div>
                <button className="chip chip-outline">+ AÑADIR</button>
              </div>
            </div>
          </div>
        </div>

        {/* Signos Vitales y Diagnóstico Card */}
        <div className="form-card" style={{ padding: '24px', marginBottom: '24px' }}>
          <h2 className="section-icon-title">
            <Activity size={20} color="#0ea5e9" />
            Signos Vitales y Diagnóstico
          </h2>
          
          <div className="vitals-grid">
            <div className="vital-box"><div className="vital-label">PESO</div><div className="vital-value">74<span className="vital-unit">kg</span></div></div>
            <div className="vital-box"><div className="vital-label">TALLA</div><div className="vital-value">1.78<span className="vital-unit">m</span></div></div>
            <div className="vital-box highlight"><div className="vital-label">IMC</div><div className="vital-value">23.4</div></div>
            <div className="vital-box"><div className="vital-label">SPO2</div><div className="vital-value">98<span className="vital-unit">%</span></div></div>
            <div className="vital-box"><div className="vital-label">FC</div><div className="vital-value">72<span className="vital-unit">bpm</span></div></div>
            <div className="vital-box"><div className="vital-label">FR</div><div className="vital-value">16<span className="vital-unit">rpm</span></div></div>
            <div className="vital-box"><div className="vital-label">T/A</div><div className="vital-value" style={{fontSize: '18px'}}>120/80</div></div>
            <div className="vital-box"><div className="vital-label">TEMP</div><div className="vital-value">36.6<span className="vital-unit">°C</span></div></div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">DIAGNÓSTICO MÉDICO</label>
            <div className="search-row">
              <div className="form-input-container" style={{ flex: 1 }}>
                <Search size={16} className="form-input-icon" />
                <input type="text" className="form-input with-icon" placeholder="Buscar diagnóstico (CIE-10)..." />
              </div>
              <button className="btn-primary" style={{ padding: '12px 24px', whiteSpace: 'nowrap' }}>
                BUSCAR
              </button>
            </div>
            <div className="chips-container">
              <div className="chip chip-gray">K02.1 - Caries de la dentina <X size={12} style={{cursor: 'pointer'}} /></div>
            </div>
          </div>
        </div>

        {/* Medicamentos e Indicaciones */}
        <div className="form-card" style={{ padding: '24px', marginBottom: 0 }}>
          <h2 className="section-icon-title">
            <Plus size={20} color="#0ea5e9" />
            Medicamentos e Indicaciones
          </h2>

          <div className="dashed-add-area">
            <div className="add-circle"><Plus size={24} /></div>
            <div className="add-text">AGREGAR MEDICAMENTO</div>
            <div className="add-subtext">Presione para buscar en el catálogo o agregar entrada manual</div>
          </div>

          <div className="form-row" style={{ marginBottom: 0 }}>
            <div className="form-group" style={{ flex: 1.5 }}>
              <label className="form-label">INDICACIONES ADICIONALES</label>
              <textarea 
                className="form-input" 
                placeholder="Dieta blanda, evitar irritantes, no realizar esfuerzos físicos..."
                style={{ height: '110px' }}
              ></textarea>
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">PRÓXIMA CITA</label>
              <div className="form-input-container" style={{ marginBottom: '16px' }}>
                <CalendarIcon size={16} className="form-input-icon" />
                <input type="text" className="form-input with-icon" defaultValue="24 / Septiembre / 2024" />
              </div>
              <div className="alert-box alert-info" style={{ marginTop: 0 }}>
                <Info size={20} style={{ flexShrink: 0 }} />
                <span>Se generará un recordatorio automático para el paciente 24 horas antes de su consulta vía WhatsApp y correo electrónico.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="page-footer-actions">
          <button className="btn-white">GUARDAR BORRADOR</button>
          <button className="btn-primary" style={{ padding: '12px 24px' }}>
            <Printer size={18} /> EMITIR RECETA MÉDICA
          </button>
        </div>

      </div>
    </Layout>
  );
};
