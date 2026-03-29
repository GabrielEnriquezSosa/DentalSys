import { Layout } from "../components/Layout/Layout";
import { 
  Camera, 
  GraduationCap, 
  MapPin, 
  Phone, 
  Smartphone, 
  Mail, 
  RotateCcw,
  Save
} from "lucide-react";

export const MiConsultorio = () => {
  const inputClass = "w-full border border-gray-300 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#007ba7] focus:border-[#007ba7] bg-white transition-all text-slate-700 font-medium text-base placeholder:text-slate-400";
  const labelClass = "block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide";

  const colorPalette = [
    { label: "ENCABEZADO", hex: "#00658D", colorClass: "bg-[#00658D]" },
    { label: "PIE DE PÁGINA", hex: "#F1F4F6", colorClass: "bg-[#F1F4F6]" },
    { label: "TABLAS", hex: "#BDC8D1", colorClass: "bg-[#BDC8D1]" },
    { label: "ÉNFASIS (TOTALES)", hex: "#00A3E0", colorClass: "bg-[#00A3E0]" },
    { label: "TEXTO GENERAL", hex: "#1B1C1E", colorClass: "bg-[#1B1C1E]" },
  ];

  return (
    <Layout>
      <div className="p-10 h-full flex flex-col w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Identidad del Consultorio</h1>
          <p className="text-base font-medium text-slate-500 mt-1">
            Configura la imagen institucional y los parámetros visuales para reportes y documentos clínicos.
          </p>
        </div>

        {/* Main Form Box */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-10 flex gap-12 mb-10">
          
          {/* Left Column (Images) */}
          <div className="w-[360px] flex flex-col gap-8 shrink-0">
            {/* Logo Principal */}
            <div>
               <label className={labelClass}>LOGO DE LA CLÍNICA (PRINCIPAL)</label>
               <div className="w-full aspect-square bg-[#f8fafc] border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-slate-400 transition-all text-slate-400">
                  <Camera size={40} className="mb-4" />
                  <span className="text-sm font-bold">Subir logo 512×512px</span>
               </div>
            </div>

            {/* Logo Secundario */}
            <div>
               <label className={labelClass}>LOGO DE UNIVERSIDAD (SECUNDARIO)</label>
               <div className="w-full h-[160px] bg-[#f8fafc] border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-slate-400 transition-all text-slate-400">
                  <GraduationCap size={32} className="mb-3" />
                  <span className="text-sm font-bold">Cargar sello académico</span>
               </div>
            </div>
          </div>

          {/* Right Column (Inputs) */}
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <label className={labelClass}>NOMBRE DE LA CLÍNICA</label>
              <input type="text" className={inputClass} defaultValue="Clínica Dental Martinez & Asociados" />
            </div>

            <div>
              <label className={labelClass}>DOMICILIO FISCAL / CONSULTORIO</label>
              <div className="relative">
                <MapPin size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" className={`${inputClass} pl-12`} defaultValue="Av. Reforma 405, Torre Médica II, Piso 12, Ciudad de México" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>TELÉFONO PRINCIPAL</label>
                <div className="relative">
                  <Phone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" className={`${inputClass} pl-12`} defaultValue="+52 55 1234 5678" />
                </div>
              </div>
              <div>
                <label className={labelClass}>TELÉFONO SECUNDARIO</label>
                <div className="relative">
                  <Smartphone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" className={`${inputClass} pl-12`} defaultValue="+52 55 8765 4321" />
                </div>
              </div>
            </div>

            <div>
              <label className={labelClass}>CORREO ELECTRÓNICO</label>
              <div className="relative">
                <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="email" className={`${inputClass} pl-12`} defaultValue="contacto@dentalmartinez.com" />
              </div>
            </div>
          </div>
        </div>

        {/* Color Palette Section */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-6">
             <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Paleta de Colores de Archivos</h2>
                <p className="text-base font-medium text-slate-500 mt-1">
                  Define los tonos que se aplicarán automáticamente a tus PDFs, recetas e historiales médicos.
                </p>
             </div>
             <button className="flex items-center gap-2 text-sm font-bold text-[#007ba7] hover:text-[#006085] transition-colors p-2 rounded hover:bg-sky-50">
               <RotateCcw size={16} strokeWidth={2.5} />
               Restaurar Predeterminados
             </button>
          </div>

          <div className="grid grid-cols-5 gap-6">
            {colorPalette.map((color, idx) => (
              <div key={idx} className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 flex flex-col items-center group cursor-pointer hover:border-[#007ba7] hover:shadow-md transition-all">
                 <div className={`w-full h-32 rounded-xl mb-4 shadow-inner ${color.colorClass}`}></div>
                 <span className="text-xs font-bold text-slate-600 mb-1">{color.label}</span>
                 <span className="text-sm font-bold text-[#007ba7] group-hover:text-[#006085]">{color.hex}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto flex justify-end">
           <button className="flex items-center gap-2 bg-[#007ba7] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#006085] transition-colors shadow-sm">
             <Save size={20} />
             GUARDAR IDENTIDAD COMPLETA
           </button>
        </div>

      </div>
    </Layout>
  );
};
