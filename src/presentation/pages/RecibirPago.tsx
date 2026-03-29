import { Layout } from "../components/Layout/Layout";
import { 
  History, 
  ChevronRight,
  Search,
  ChevronDown,
  PlusCircle,
  Banknote,
  Trash2,
  CheckCircle2,
  Info,
  X
} from "lucide-react";

export const RecibirPago = () => {
  const patientInputClass = "w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#007ba7] focus:border-[#007ba7] bg-slate-50 transition-all text-slate-700 font-medium placeholder:text-slate-400 text-base flex items-center gap-2";
  const labelClass = "block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest";

  const pendingPatients = [
    { init: "AM", name: "Ana Martinez", treat: "Limpieza Profunda + Resina", color: "bg-sky-100 text-sky-600" },
    { init: "RC", name: "Roberto Castillo", treat: "Extracción de Cordal", color: "bg-orange-100 text-orange-600" },
    { init: "LG", name: "Laura Garcia", treat: "Tratamiento de Conducto", color: "bg-indigo-100 text-indigo-600" },
  ];

  const cartServices = [
    {
      id: 1,
      name: "Resina Compuesta",
      cat: "Clínica General",
      desc: "Restauración en pieza 36...",
      price: "120.00",
      amount: "120.00"
    },
    {
      id: 2,
      name: "Profilaxis Dental",
      cat: "Higiene",
      desc: "Limpieza profunda con ultrasonido...",
      price: "85.00",
      amount: "85.00"
    }
  ];

  return (
    <Layout>
      <div className="p-10 h-full flex flex-col w-full relative">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#006085] tracking-tight uppercase">RECIBIR PAGO</h1>
            <p className="text-base font-medium text-slate-500 mt-1">
              Registra pagos de tratamientos y servicios con precisión clínica.
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all bg-white border border-slate-200 text-[#007ba7] hover:bg-slate-50 text-base shadow-sm">
            <History size={20} />
            HISTORIAL DE PAGOS
          </button>
        </div>

        {/* Content Layout */}
        <div className="flex gap-8 flex-1 items-start pb-20">
          
          {/* Left Column */}
          <div className="w-[420px] flex flex-col gap-8 shrink-0">
            {/* Pending Patients Window */}
            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100">
               <div className="flex items-center justify-between mb-5">
                 <h3 className="text-sm font-bold text-slate-600 uppercase tracking-widest">PACIENTES CON TRATAMIENTOS PENDIENTES</h3>
                 <span className="bg-[#006085] text-white text-xs font-bold px-3 py-1 rounded-full">12</span>
               </div>
               
               <div className="flex flex-col gap-4">
                 {pendingPatients.map((p, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm border border-slate-100 cursor-pointer hover:border-sky-300 transition-colors group">
                       <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-base font-bold ${p.color}`}>
                             {p.init}
                          </div>
                          <div>
                            <p className="text-base font-bold text-slate-800 leading-tight">{p.name}</p>
                            <p className="text-xs font-medium text-slate-500 mt-1">{p.treat}</p>
                          </div>
                       </div>
                       <ChevronRight size={20} className="text-slate-300 group-hover:text-sky-500 transition-colors" />
                    </div>
                 ))}
               </div>
            </div>

            {/* Total Widget */}
            <div className="bg-[#007ba7] rounded-3xl p-8 text-white shadow-md relative overflow-hidden">
               {/* Decorative background circle */}
               <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

               <p className="text-sm font-bold text-sky-100 uppercase tracking-widest mb-2 opacity-90">TOTAL A PAGAR</p>
               <h2 className="text-6xl font-bold tracking-tight mb-10 drop-shadow-sm">$ 0.00</h2>
               
               <div className="flex flex-col gap-4 mb-8 border-b border-sky-400/30 pb-8">
                 <div className="flex justify-between items-center text-base font-medium opacity-90">
                   <span>Subtotal</span>
                   <span>$ 0.00</span>
                 </div>
                 <div className="flex justify-between items-center text-base font-medium opacity-90">
                   <span>Descuento</span>
                   <span>- $ 0.00</span>
                 </div>
               </div>

               <button className="w-full bg-white text-[#007ba7] font-bold py-4 text-lg rounded-xl flex items-center justify-center gap-2 hover:bg-sky-50 transition-colors shadow-sm">
                 <CheckCircle2 size={24} />
                 PROCESAR PAGO
               </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col gap-8 w-full">
            {/* Top Controls Box */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col gap-6">
              
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                  <label className={labelClass}>PACIENTE</label>
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="text" className={`${patientInputClass} pl-10`} placeholder="Seleccionar paciente..." />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>DESCUENTO (%)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">%</span>
                    <input type="text" className={`${patientInputClass} pl-9`} placeholder="0" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>MÉTODO DE PAGO</label>
                  <div className="relative cursor-pointer">
                    <Banknote className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <div className={`${patientInputClass} pl-10 cursor-pointer flex justify-between items-center`}>
                       <span className="text-slate-800 font-bold">Efectivo</span>
                       <ChevronDown size={16} className="text-slate-400" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>AGREGAR SERVICIO MANUAL</label>
                  <div className="relative cursor-pointer">
                    <PlusCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <div className={`${patientInputClass} pl-10 cursor-pointer flex justify-between items-center`}>
                       <span className="text-slate-500">Seleccionar tratamiento...</span>
                       <ChevronDown size={16} className="text-slate-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className={labelClass}>TIPO DE PAGO</label>
                <div className="flex items-center gap-8 mt-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className="w-6 h-6 rounded-full border-[7px] border-[#006085] bg-white"></div>
                    <span className="text-base font-bold text-slate-800">Pagar Todo</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className="w-6 h-6 rounded-full border-[3px] border-slate-300 bg-white"></div>
                    <span className="text-base font-bold text-slate-600">Pago Parcial (Abono)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className={labelClass}>NOTAS</label>
                <textarea 
                  className={`${patientInputClass} min-h-[80px] resize-none pb-2`} 
                  placeholder="Observaciones adicionales del pago..."
                ></textarea>
              </div>

            </div>

            {/* Bill Details Box */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
               <div className="p-6 border-b border-slate-100">
                 <h3 className="text-xs font-bold text-slate-600 uppercase tracking-widest">DESGLOSE DE SERVICIOS</h3>
               </div>

               {/* Table Header */}
               <div className="grid grid-cols-[2fr_2fr_140px_140px_80px] gap-6 px-8 py-5 bg-slate-50/80 border-b border-slate-100 items-center">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">SERVICIO / TRATAMIENTO</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">DESCRIPCIÓN</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest text-right">PRECIO TOTAL</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest text-right">MONTO A PAGAR</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">ACCIÓN</div>
               </div>

               {/* Table Body */}
               <div className="flex flex-col divide-y divide-slate-50">
                  {cartServices.map((svc) => (
                    <div key={svc.id} className="grid grid-cols-[2fr_2fr_140px_140px_80px] gap-6 px-8 py-6 items-center hover:bg-slate-50/50 transition-colors">
                       <div>
                         <p className="text-base font-bold text-slate-800">{svc.name}</p>
                         <p className="text-xs font-bold text-[#007ba7] mt-1">{svc.cat}</p>
                       </div>
                       <div className="text-sm font-medium text-slate-500 line-clamp-2 pr-4">{svc.desc}</div>
                       <div className="text-base font-bold text-slate-800 text-right">$ {svc.price}</div>
                       <div>
                         <div className="bg-slate-100 rounded-lg px-4 py-2.5 flex items-center justify-between text-base font-bold text-slate-800">
                            <span>$</span>
                            <span>{svc.amount}</span>
                         </div>
                       </div>
                       <div className="flex justify-center">
                          <button className="text-red-400 hover:text-red-500 hover:bg-red-50 p-2.5 rounded-lg transition-colors">
                            <Trash2 size={20} strokeWidth={2.5} />
                          </button>
                       </div>
                    </div>
                  ))}
               </div>

               {/* Footer Total */}
               <div className="p-8 bg-slate-50/50 flex flex-col items-end border-t border-slate-100">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">TOTAL CALCULADO</p>
                  <h3 className="text-4xl font-bold text-[#006085] tracking-tight">$ 205.00</h3>
               </div>
            </div>

          </div>

        </div>

        {/* Floating Notification (Simulated) */}
        <div className="fixed bottom-8 right-8 bg-white rounded-2xl shadow-xl border border-slate-100 p-5 w-[360px] flex gap-5 animate-in slide-in-from-bottom-5 fade-in duration-300">
           <div className="bg-sky-50 text-[#007ba7] w-12 h-12 rounded-full flex items-center justify-center shrink-0">
             <Info size={24} strokeWidth={2.5}/>
           </div>
           <div className="flex-1 pr-2 flex flex-col justify-center">
              <h4 className="text-sm font-bold text-slate-800 mb-1 leading-tight">Sistema Conectado</h4>
              <p className="text-xs font-medium text-slate-500 leading-tight">Listo para procesar pagos de facturación inmediata.</p>
           </div>
           <button className="text-slate-400 hover:text-slate-600 opacity-50 hover:opacity-100 transition-opacity self-start mt-1">
             <X size={18} />
           </button>
        </div>

      </div>
    </Layout>
  );
};
