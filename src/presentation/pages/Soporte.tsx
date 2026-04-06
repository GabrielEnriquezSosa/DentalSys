import { Layout } from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import {
  Headset,
  MessageSquare,
  AtSign,
  Facebook,
  Instagram,
  ArrowLeft,
  ExternalLink,
  ArrowRight,
  Mail,
  Check,
  Building2,
  MapPin,
  Lightbulb,
} from "lucide-react";
import mapImg from "../../assets/map_torreon.webp";

export const Soporte = () => {
  return (
    <Layout>
      <div className="p-4 md:p-6 lg:p-10 w-full">
        {/* Hero Banner */}
        <div className="relative bg-gradient-to-r from-sky-600 to-sky-500 rounded-2xl p-6 md:p-10 mb-8 md:mb-10 overflow-hidden shadow-md">
          {/* Decorative cross */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-15">
            <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
              <rect x="50" y="0" width="40" height="140" rx="8" fill="white" />
              <rect x="0" y="50" width="140" height="40" rx="8" fill="white" />
            </svg>
          </div>
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              ¿Cómo podemos ayudarte hoy?
            </h1>
            <p className="text-sky-100 text-lg leading-relaxed font-medium">
              Bienvenido al Centro de Soporte de Dental.sys. Estamos aquí para
              asegurar que tu clínica funcione sin contratiempos con asistencia
              técnica especializada.
            </p>
          </div>
        </div>

        {/* Content: 2-column layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Column — Canales de Soporte */}
          <div className="flex-[2]">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Headset size={22} className="text-sky-600" />
              Canales de Soporte
            </h2>

            {/* WhatsApp + Correo row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {/* WhatsApp Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                      <MessageSquare size={24} className="text-green-600" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-green-700 bg-green-100 px-3 py-1.5 rounded-full">
                      Respuesta Inmediata
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mb-1">
                    WhatsApp Directo
                  </h3>
                  <p className="text-lg font-bold text-sky-600 mb-4">
                    +52 871-331-0350
                  </p>
                </div>
                <a
                  href="https://wa.me/528713310350"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sky-600 font-bold text-sm hover:text-sky-700 transition-colors"
                >
                  Iniciar chat ahora <ArrowRight size={16} />
                </a>
              </div>

              {/* Correo Electrónico Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                      <AtSign size={24} className="text-blue-600" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-3 py-1.5 rounded-full">
                      Soporte Administrativo
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mb-1">
                    Correo Electrónico
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">
                    admon.excelpro360@gmail.com
                  </p>
                </div>
                <a
                  href="mailto:admon.excelpro360@gmail.com"
                  className="inline-flex items-center gap-2 text-sky-600 font-bold text-sm hover:text-sky-700 transition-colors"
                >
                  Redactar mensaje <Mail size={16} />
                </a>
              </div>
            </div>

            {/* Social Media row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {/* Facebook Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-7">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                    <Facebook size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">
                      Síguenos en Facebook
                    </h3>
                    <p className="text-sm text-slate-500">
                      Únete a nuestra comunidad
                    </p>
                  </div>
                </div>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-sky-500 text-white font-bold text-sm py-3 px-6 rounded-xl hover:bg-sky-600 transition-colors"
                >
                  Visitar nuestro Facebook <ExternalLink size={16} />
                </a>
              </div>

              {/* Instagram Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-7">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center">
                    <Instagram size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">
                      Síguenos en Instagram
                    </h3>
                    <p className="text-sm text-slate-500">
                      Síguenos para novedades y consejos visuales
                    </p>
                  </div>
                </div>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-sky-500 text-white font-bold text-sm py-3 px-6 rounded-xl hover:bg-sky-600 transition-colors"
                >
                  Visitar Instagram <ExternalLink size={16} />
                </a>
              </div>
            </div>

            {/* Back to Dashboard */}
            <div className="flex justify-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-slate-500 font-semibold text-sm hover:text-sky-600 transition-colors no-underline"
              >
                <ArrowLeft size={18} />
                Volver al Menú Principal
              </Link>
            </div>
          </div>

          {/* Right Column — About + Map + Tip */}
          <div className="flex-[0.85] flex flex-col gap-6">
            {/* ¿Quiénes somos? */}
            <div className="bg-white rounded-2xl border border-slate-200 p-7">
              <h3 className="font-bold text-base text-slate-900 mb-4 flex items-center gap-2">
                <Building2 size={20} className="text-sky-600" />
                ¿Quiénes somos?
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-5">
                Somos especialistas en el desarrollo de herramientas de gestión
                de alta precisión. Nuestra experiencia abarca:
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-sky-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    Plantillas Avanzadas de Excel
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-sky-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    Sistemas Automatizados VBA
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-sky-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    Aplicaciones Web HTML5
                  </span>
                </div>
              </div>
            </div>

            {/* Map + Ubicación */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <img
                src={mapImg}
                alt="Mapa de ubicación - Torreón, Coahuila"
                className="w-full h-44 object-cover"
              />
              <div className="p-6">
                <div className="flex items-start gap-3">
                  <MapPin
                    size={20}
                    className="text-sky-600 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1">
                      Ubicación Central
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Torreón, Coahuila, México. Soporte regional y nacional
                      disponible.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tip de Ayuda */}
            <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
              <div className="flex items-start gap-3">
                <Lightbulb
                  size={20}
                  className="text-amber-600 flex-shrink-0 mt-0.5"
                />
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-amber-800 mb-2">
                    Tip de Ayuda
                  </h4>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    ¿Tienes capturas del error? Adjúntalas vía WhatsApp para una
                    resolución hasta 50% más rápida.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
