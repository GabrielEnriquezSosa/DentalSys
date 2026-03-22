import { Layout } from "../components/Layout/Layout";
import { Phone, Upload, Link, Contact, BadgeCheck } from "lucide-react";

export const PerfilesMedicos = () => {
  return (
    <Layout>
      <div className="dashboard-container">
        <div className="page-header">
          <h1 className="page-title">Perfiles Médicos</h1>
          <p className="page-subtitle">
            Complete la información para registrar un nuevo médico en el sistema centralizado de Dental.sys.
          </p>
        </div>

        <div className="form-card">
          <div className="form-group" style={{ marginBottom: "24px" }}>
            <label className="form-label">Nombre Completo del Médico</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ej. Dr. Juan Pérez"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Especialidad</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej. Odontología Pediátrica"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Cédula Profesional</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ingrese número de cédula"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Teléfono para Citas</label>
              <div className="form-input-container">
                <Phone size={16} className="form-input-icon" />
                <input
                  type="text"
                  className="form-input with-icon"
                  placeholder="+52 (55) 0000 0000"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Universidad de Egreso</label>
              <input
                type="text"
                className="form-input"
                placeholder="Nombre de la institución"
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "24px" }}>
            <label className="form-label">Domicilio del Consultorio</label>
            <textarea
              className="form-input"
              placeholder="Calle, número, colonia, CP, ciudad"
            ></textarea>
          </div>

          <div className="form-group">
            <label className="form-label">Firma Digital (URL de Imagen)</label>
            <div className="form-input-container">
              <Link size={16} className="form-input-icon" />
              <input
                type="text"
                className="form-input with-icon"
                placeholder="https://ejemplo.com/firma.png"
              />
              <button className="upload-button">
                <Upload size={16} />
                Subir
              </button>
            </div>
            
            <div className="signature-preview">
              <span>Vista previa de la firma</span>
              <div className="signature-box">
                <Contact size={32} color="#cbd5e1" />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button className="btn-primary btn-large">
              <BadgeCheck size={20} />
              REGISTRAR PERFIL MÉDICO
            </button>
            <p className="form-disclaimer">
              Al registrar, el médico podrá acceder a su panel personalizado y gestionar expedientes clínicos.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
