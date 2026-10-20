import React from 'react';
import { Shield, Satellite, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030508] border-t border-[#d4af37]/25 text-slate-400 py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-900">
          
          {/* Main Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl border border-[#d4af37]/60 overflow-hidden bg-black shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                <img
                  src="/assets/aistudio/20261020-103025_200a1536.png"
                  alt="شعار حصن - وعيك حصنك"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#d4af37] to-amber-500">
                  منصة حِصْن
                </span>
                <span className="block text-xs text-[#d4af37] font-semibold">
                  وعيك حصنك
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              مشروع استخباري جيومكاني مبتكر من تطوير مبادرة <strong className="text-slate-200">رواد الذكاء الاصطناعي - المدينة المنورة</strong>، يوظف بيانات الاستشعار عن بعد والأشعة تحت الحمراء لحماية المجتمع ودعم الأجهزة الأمنية في مكافحة المخدرات.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a0f1d] border border-[#d4af37]/30 text-amber-300 text-xs font-mono">
              <Satellite className="w-3.5 h-3.5" />
              <span>AL-MADINAH AL-MUNAWWARAH DEFENSE INITIATIVE</span>
            </div>
          </div>

          {/* Nav Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              أقسام المنصة
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#intro" className="hover:text-amber-300 transition-colors">
                  1. المقدمة ومفهوم الاستشعار
                </a>
              </li>
              <li>
                <a href="#methodology" className="hover:text-amber-300 transition-colors">
                  2. المنهجية ومصادر البيانات (FIRMS, MODIS, VIIRS)
                </a>
              </li>
              <li>
                <a href="#map-section" className="hover:text-amber-300 transition-colors">
                  3. غرفة العمليات والخريطة التفاعلية
                </a>
              </li>
              <li>
                <a href="#results" className="hover:text-amber-300 transition-colors">
                  4. النتائج ورؤية المملكة 2030
                </a>
              </li>
            </ul>
          </div>

          {/* Operational Protocols */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              الاعتماد والمعايير التقنية
            </h4>
            <div className="p-4 rounded-xl bg-[#070b13] border border-slate-800 text-xs text-slate-400 space-y-1.5">
              <div className="flex justify-between">
                <span>المركز الجغرافي:</span>
                <span className="text-slate-200 font-mono">المدينة المنورة [24.4672, 39.6111]</span>
              </div>
              <div className="flex justify-between">
                <span>بروتوكول الواجهة:</span>
                <span className="text-amber-300 font-mono">GET /api/suspicious/madinah</span>
              </div>
              <div className="flex justify-between">
                <span>تكامل الخوارزمية:</span>
                <span className="text-emerald-400 font-mono">Haversine &lt; 1.1km | NDVI &gt; 0.35</span>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="w-full py-2 px-3 rounded-lg bg-[#0e1628] hover:bg-[#16233d] border border-slate-800 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors mt-2"
            >
              <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
              <span>العودة لأعلى الصفحة</span>
            </button>
          </div>

        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex items-center gap-2">
            <span>جميع الحقوق محفوظة © {new Date().getFullYear()}</span>
            <span className="text-amber-400 font-bold">منصة حِصْن</span>
            <span>•</span>
            <span className="text-slate-300">رواد الذكاء الاصطناعي - المدينة المنورة</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-amber-300/80 font-semibold">
            <span>المملكة العربية السعودية</span>
            <span>•</span>
            <span>وعيك حصنك</span>
            <span>•</span>
            <span className="font-mono text-emerald-400">DEFENSE GRADE INTELLIGENCE</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
