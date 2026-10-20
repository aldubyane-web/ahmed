import React from 'react';
import { Shield, Satellite, Radio, ExternalLink, ChevronDown } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#070a10]/90 backdrop-blur-md border-b border-[#d4af37]/25 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & National Identity */}
          <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer">
              <div className="w-13 h-13 rounded-xl border border-[#d4af37]/60 p-0.5 bg-gradient-to-br from-[#1a1f2c] to-[#0a0d14] shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-transform duration-300 group-hover:scale-105 overflow-hidden">
                <img
                  src="/assets/aistudio/20261020-103025_200a1536.png"
                  alt="شعار حصن - وعيك حصنك - رواد الذكاء الاصطناعي بالمدينة المنورة"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#070a10] animate-pulse" title="قمر صناعي متصل بنجاح" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#d4af37] to-amber-500">
                  حِصْن
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37]/90 px-2 py-0.5 rounded border border-[#d4af37]/40 bg-[#d4af37]/10">
                  HISN INTELLIGENCE
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium hidden sm:block">
                توظيف بيانات الأقمار الاصطناعية في دعم جهود مكافحة المخدرات
              </p>
              <div className="flex items-center gap-2 text-[10px] text-amber-300/80 mt-0.5 font-semibold">
                <span>رواد الذكاء الاصطناعي - المدينة المنورة</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-normal flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  رصد مداري نشط
                </span>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <a
              href="#intro"
              className="px-3 py-2 text-sm text-slate-300 hover:text-amber-300 hover:bg-[#d4af37]/10 rounded-lg transition-colors font-medium"
            >
              المقدمة والمفهوم
            </a>
            <a
              href="#methodology"
              className="px-3 py-2 text-sm text-slate-300 hover:text-amber-300 hover:bg-[#d4af37]/10 rounded-lg transition-colors font-medium"
            >
              المنهجية الفضائية
            </a>
            <a
              href="#map-section"
              className="px-3 py-2 text-sm text-amber-300 hover:text-amber-200 bg-[#d4af37]/15 border border-[#d4af37]/40 rounded-lg transition-all font-semibold shadow-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.25)] flex items-center gap-1.5"
            >
              <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
              المنصة والخريطة التفاعلية
            </a>
            <a
              href="#results"
              className="px-3 py-2 text-sm text-slate-300 hover:text-amber-300 hover:bg-[#d4af37]/10 rounded-lg transition-colors font-medium"
            >
              النتائج ورؤية 2030
            </a>
          </nav>

          {/* Quick Badges & Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex flex-col text-left font-mono text-[11px] text-slate-400 bg-[#0d121c] border border-[#d4af37]/40 px-3 py-1.5 rounded-lg shadow-sm">
              <span className="text-amber-300 font-bold flex items-center gap-1">
                <Satellite className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                PHASE 2 FORENSIC ACTIVE
              </span>
              <span className="text-slate-400 text-[10px]">SAR S1 + Landsat 9 + S2</span>
            </div>

            <a
              href="#map-section"
              className="px-4 py-2 bg-gradient-to-r from-[#d4af37] to-amber-600 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-bold text-xs sm:text-sm rounded-lg shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Shield className="w-4 h-4 text-slate-950" />
              <span>بدء الاستطلاع</span>
            </a>
          </div>

        </div>
      </div>
    </header>
  );
};
