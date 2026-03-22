import { Layout } from "../components/Layout/Layout";
import { 
  PlusCircle, 
  Save, 
  FileText, 
  Search, 
  Pencil, 
  Trash2 
} from "lucide-react";

const tableData = [
  {
    id: 1,
    nombre: "Amoxicilina 500mg",
    categoria: "Antibiótico",
    badgeColor: "badge-blue",
    uso: "Infecciones bacterianas post-cirugía"
  },
  {
    id: 2,
    nombre: "Ibuprofeno 600mg",
    categoria: "Analgésico",
    badgeColor: "badge-orange",
    uso: "Control de dolor e inflamación"
  },
  {
    id: 3,
    nombre: "Clorhexidina 0.12%",
    categoria: "Antiséptico",
    badgeColor: "badge-green",
    uso: "Enjuague bucal pre/post tratamiento"
  }
];

export const Medicamentos = () => {
  return (
    <Layout>
      <div className="dashboard-container">
        <div className="page-header">
          <h1 className="page-title">Catálogo de Medicamentos 💊</h1>
          <p className="page-subtitle">
            Registra fármacos y sus usos para consultas rápidas.
          </p>
        </div>

        <div className="form-card">
          <div className="card-title">
            <PlusCircle color="#0ea5e9" size={20} />
            <span>Registro de Nuevo Medicamento</span>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Nombre del Medicamento</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej: Amoxicilina 500mg"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Categoría Terapéutica</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej: Antibiótico / Analgésico"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Uso Principal / Indicación</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej: Infecciones bacterianas"
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
            <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '14px' }}>
              <Save size={18} />
              REGISTRAR MEDICAMENTO
            </button>
            <button className="btn-secondary" style={{ padding: '14px 24px' }}>
              <FileText size={18} />
              CARGA MASIVA (TXT)
            </button>
          </div>
        </div>

        <div className="list-header">
          <h2 className="list-title">Medicamentos Registrados</h2>
          <div className="form-input-container" style={{ width: '320px' }}>
            <Search size={16} className="form-input-icon" />
            <input 
              type="text" 
              className="form-input with-icon" 
              placeholder="Buscar medicamento por nombre..." 
              style={{ backgroundColor: 'white', border: '1px solid #e2e8f0' }}
            />
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>MEDICAMENTO</th>
                <th>CATEGORÍA</th>
                <th>USO PRINCIPAL</th>
                <th>ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600 }}>{item.nombre}</td>
                  <td>
                    <span className={`badge ${item.badgeColor}`}>
                      {item.categoria}
                    </span>
                  </td>
                  <td style={{ color: '#64748b' }}>{item.uso}</td>
                  <td>
                    <div className="table-actions">
                      <button className="action-btn">
                        <Pencil size={18} />
                      </button>
                      <button className="action-btn delete" style={{ color: '#ef4444' }}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};
