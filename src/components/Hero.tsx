import React from 'react';
import { Shield, Satellite, Flame, Trees, Sparkles, Compass, AlertCircle, ArrowDown } from 'lucide-react';
import { SYSTEM_METRICS } from '../data/mockData';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#05070a] pt-6 pb-16">
      
      {/* Background Satellite Image with Cinematic Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hisn_hero_satellite_1792480236205.jpg"
          alt="رصد الأقمار الاصطناعية فوق المدينة المنورة والمملكة العربية السعودية"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-45 scale-105 transform hover:scale-100 transition-transform duration-1000 ease-out"
        />
        {/* Multilayered radial gradients for luxury gold & deep space feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/70 to-[#05070a]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-[#05070a]/90" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#d4af3708_1px,transparent_1px),linear-gradient(to_bottom,#d4af3708_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center text-center">
        
        {/* Top Floating Golden Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d131f]/90 border border-[#d4af37]/50 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs font-bold text-amber-200">
              المبادرة التقنية الأولى من نوعها بالمملكة
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d131f]/90 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
            <Satellite className="w-3.5 h-3.5" />
            <span>تغطية فضائية مستمرة لمنطقة المدينة المنورة</span>
          </div>
        </div>

        {/* Official Golden Shield Emblem */}
        <div className="relative mb-6 group cursor-pointer">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 transition-all duration-500 group-hover:scale-105">
            {/* Ambient golden glow behind the shield */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/20 via-[#d4af37]/30 to-amber-300/10 blur-2xl group-hover:blur-3xl transition-all" />
            
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[#d4af37]/40 bg-[#070b13]/80 p-2 shadow-[0_0_40px_rgba(212,175,55,0.35)] backdrop-blur-sm">
              <img
                src="/assets/aistudio/20261020-103025_200a1536.png"
                alt="شعار حصن - وعيك حصنك - رواد الذكاء الاصطناعي بالمدينة المنورة"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight mb-4 max-w-5xl leading-tight">
          منصة <span className="gold-gradient-text drop-shadow-[0_2px_20px_rgba(212,175,55,0.5)]">حِصْن</span>
        </h1>

        <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-200 max-w-4xl leading-relaxed mb-6">
          توظيف بيانات الأقمار الاصطناعية في دعم جهود مكافحة المخدرات
        </p>

        {/* Subtitle / Strategic Abstract */}
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed mb-10 font-normal">
          منظومة استخبارية جيومكانية ذكية تعيد ابتكار توظيف بيانات حرائق ناسا <span className="text-amber-300 font-semibold">(MODIS & VIIRS)</span> والأطياف النباتية <span className="text-amber-300 font-semibold">(Sentinel-2)</span>، لكشف أوكار التصنيع السري ومستودعات التهريب ومزارع النباتات المحظورة عبر خوارزميات الاستشعار الحراري الليلي المستمر.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto">
          <a
            href="#map-section"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#d4af37] via-amber-400 to-[#d4af37] hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-base rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 border border-amber-200"
          >
            <Compass className="w-5 h-5 text-slate-950" />
            <span>فتح الخريطة التفاعلية وغرفة العمليات</span>
          </a>

          <a
            href="#methodology"
            className="w-full sm:w-auto px-7 py-4 bg-[#0e1422]/90 hover:bg-[#151e33] text-amber-200 hover:text-white font-bold text-base rounded-xl border border-[#d4af37]/40 hover:border-amber-400 transition-all flex items-center justify-center gap-3 shadow-lg"
          >
            <Satellite className="w-5 h-5 text-amber-400" />
            <span>استعراض منهجية الخوارزميات</span>
          </a>
        </div>

        {/* Live Operational Metrics Ribbon */}
        <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#090e18]/90 border border-[#d4af37]/30 shadow-[0_10px_35px_rgba(0,0,0,0.7)] backdrop-blur-md">
          
          <div className="flex flex-col items-center p-3 rounded-xl bg-[#0e1422]/70 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium mb-1">دقة التحقق والخوارزمية</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                {SYSTEM_METRICS.accuracy_rate}%
              </span>
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold mt-1">تأكيد طيفي وحراري مزدوج</span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-xl bg-[#0e1422]/70 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium mb-1">زمن رصد الأهداف المشبوهة</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                {SYSTEM_METRICS.detection_window_hours}
              </span>
              <span className="text-xs text-slate-400">ساعة</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1">مقارنة بـ 45 يوماً تقليدياً</span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-xl bg-[#0e1422]/70 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium mb-1">تصفية الإنذارات الكاذبة</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-slate-400 font-mono line-through">
                124
              </span>
              <span className="text-xs text-slate-500">←</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                {SYSTEM_METRICS.filtered_verified_targets}
              </span>
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold mt-1">تقليص بنسبة {SYSTEM_METRICS.false_alarm_reduction_percentage}%</span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-xl bg-[#0e1422]/70 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium mb-1">تزامن وتحديث بيانات ناسا</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                كل {SYSTEM_METRICS.update_cycle_hours}
              </span>
              <span className="text-xs text-slate-400">ساعات</span>
            </div>
            <span className="text-[11px] text-amber-300/80 font-semibold mt-1">دورة مدارية فورية</span>
          </div>

        </div>

        {/* Scroll hint indicator */}
        <a
          href="#intro"
          className="mt-12 text-slate-500 hover:text-amber-400 transition-colors flex flex-col items-center gap-1 group"
        >
          <span className="text-xs font-semibold tracking-wider">استكشف أقسام المنصة</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-amber-400" />
        </a>

      </div>
    </section>
  );
};
