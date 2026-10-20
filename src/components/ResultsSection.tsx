import React from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  Target, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight,
  ChevronLeft,
  FileCheck
} from 'lucide-react';
import { SYSTEM_METRICS, VISION_2030_PILLARS } from '../data/mockData';

export const ResultsSection: React.FC = () => {
  return (
    <section id="results" className="py-24 bg-[#05070c] relative border-t border-[#d4af37]/20">
      
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-amber-300 text-xs font-bold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>القسم الرابع: النتائج التشغيلية والخلاصة الاستراتيجية</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            أثر استخباري ملموس ومواءمة مع <span className="gold-gradient-text">رؤية المملكة 2030</span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-6" />

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            أثبتت نتائج تطبيق نموذج "حِصْن" في منطقة المدينة المنورة قفزة نوعية في دقة وسرعة مكافحة شبكات تهريب وتصنيع المواد المخدرة، مع خفض هائل في هدر الموارد الميدانية.
          </p>
        </div>

        {/* 3 Major Metric Impact Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Card 1: False Alarms */}
          <div className="rounded-2xl bg-gradient-to-br from-[#0c1322] to-[#070b13] border border-[#d4af37]/40 p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between group hover:border-amber-400 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <TrendingUp className="w-6 h-6" />
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
                  خفض بنسبة {SYSTEM_METRICS.false_alarm_reduction_percentage}%
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">تقليص الإنذارات الكاذبة</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                تصفية شاملة لضوضاء حرائق المخيمات والنيران العابرة واستبعاد الأنشطة المدنية المرخصة.
              </p>

              {/* Visual Number Transformation */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#05070a] border border-slate-800">
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">قبل فلترة حصن</span>
                  <span className="text-2xl font-mono font-bold text-slate-500 line-through">
                    {SYSTEM_METRICS.initial_alerts} إنذار
                  </span>
                </div>

                <div className="text-amber-400 font-bold text-lg">←</div>

                <div className="text-left">
                  <span className="text-[11px] text-emerald-400 block font-semibold">أهداف مؤكدة وموثقة</span>
                  <span className="text-3xl font-mono font-black text-amber-400">
                    {SYSTEM_METRICS.filtered_verified_targets} هدفاً
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400">
              توفير مئات ساعات الاستطلاع الجوي وتوجيه الفرق لأهداف قطعية
            </div>
          </div>

          {/* Card 2: 72 Hours */}
          <div className="rounded-2xl bg-gradient-to-br from-[#0c1322] to-[#070b13] border border-[#d4af37]/40 p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between group hover:border-amber-400 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <Clock className="w-6 h-6" />
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-700">
                  سرعة استباقية قياسية
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">نافذة كشف 72 ساعة</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                رصد المعمل السري أو المزرعة المحظورة خلال 3 ليالٍ فقط من بدء نشاطها الليلي.
              </p>

              {/* Visual Speed comparison */}
              <div className="p-4 rounded-xl bg-[#05070a] border border-slate-800 space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">الرصد التقليدي بالمطابقات البلاغية:</span>
                    <span className="text-slate-400 font-mono font-bold">~ 45 يوماً</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="w-full h-full bg-slate-600 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-amber-300 font-bold">منظومة حِصْن الفضائية:</span>
                    <span className="text-emerald-400 font-mono font-black">72 ساعة فقط</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="w-[12%] h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400">
              إحباط المخططات في مهدها قبل بدء توزيع الشحنات
            </div>
          </div>

          {/* Card 3: 94.6% Accuracy */}
          <div className="rounded-2xl bg-gradient-to-br from-[#0c1322] to-[#070b13] border border-[#d4af37]/40 p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between group hover:border-amber-400 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <Target className="w-6 h-6" />
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
                  تأكيد موثق ميدانياً
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">دقة رصد 94.6%</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                مطابقة الإحداثيات النقطية المعالجة مع المواقع الفعلية على الأرض بدقة جيومكانية فائقة.
              </p>

              <div className="p-4 rounded-xl bg-[#05070a] border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-3xl font-mono font-black text-amber-400">
                    {SYSTEM_METRICS.accuracy_rate}%
                  </span>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    نسبة المطابقة والتحقق
                  </span>
                </div>
                <div className="text-left">
                  <span className="text-sm font-bold text-emerald-400 block">
                    صفر خطأ مكاني
                  </span>
                  <span className="text-[11px] text-slate-400">
                    بفضل دمج هافرسين
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400">
              حماية سمعة العمليات وضمان سلامة الطواقم الميدانية
            </div>
          </div>

        </div>

        {/* Alignment with Vision 2030 (4 Strategic Pillars) */}
        <div className="rounded-3xl bg-gradient-to-b from-[#0b101c] to-[#070b14] border border-[#d4af37]/40 p-8 sm:p-12 shadow-2xl relative overflow-hidden mb-16">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-amber-300 text-xs font-black mb-3">
              <Award className="w-4 h-4 text-amber-400" />
              <span>مستهدفات رؤية المملكة 2030</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white">
              منظومة فضائية تدعم أهداف الوطن الاستراتيجية
            </h3>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              تتسق منصة "حصن" مباشرة مع تطلعات القيادة الرشيدة في بناء مجتمع آمن، تعزيز السيادة الرقمية، وحماية أمن واقتصاد المملكة العربية السعودية.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VISION_2030_PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#060910] border border-slate-800 hover:border-[#d4af37]/50 transition-all flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-[#d4af37]/30 flex items-center justify-center text-amber-400 shrink-0 mt-1">
                  <CheckCircle2 className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white">
                    {pillar.title}
                  </h4>
                  <span className="text-xs text-amber-400/90 font-semibold block mb-2">
                    {pillar.subtitle}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {pillar.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Committee Presentation Highlight (Phase 2) */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0d1627] via-[#0f1d33] to-[#0d1627] border-2 border-[#d4af37]/60 shadow-[0_0_40px_rgba(212,175,55,0.25)] mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-600 inline-block">
                صيغة العرض التنفيذي أمام اللجان الرسمية
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-white leading-tight">
                "نظامنا يكشف بدقة 1 كم، ويؤكد بدقة 10 متر حراري و 10 متر راداري، ويقلل البلاغات الكاذبة بنسبة 90%"
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                بفضل دمج رادار <strong className="text-amber-300">Sentinel-1 InSAR Coherence</strong> الذي يثبت الحفر والتمويه تحت السحب والظلام مع حراري <strong className="text-amber-300">Landsat 8/9 TIRS Band 10</strong> الذي يحسم مصادر احتراق المحركات عن صخور البازلت، أصبحت منظومة "حِصْن" مؤهلة بالكامل للاعتماد الأمني الجنائي.
              </p>
            </div>

            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className="text-center font-mono p-4 rounded-2xl bg-black/60 border border-[#d4af37]/40 min-w-[170px]">
                <span className="text-xs text-slate-400 block">انخفاض البلاغات الكاذبة</span>
                <span className="text-4xl font-black text-emerald-400">90.0%</span>
                <span className="text-[10px] text-amber-300 block mt-1">تأكيد جنائي حاسم</span>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Conclusion Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#121929] via-[#0e1628] to-[#121929] border border-[#d4af37]/50 shadow-[0_0_30px_rgba(212,175,55,0.2)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl border border-[#d4af37]/60 overflow-hidden shrink-0 shadow-lg bg-black">
              <img
                src="/assets/aistudio/20261020-103025_200a1536.png"
                alt="شعار حصن - وعيك حصنك"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-lg font-black text-white">
                خلاصة المشروع والتوصية التنفيذية
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                إن توظيف الاستشعار الفضائي المفتوح عبر نموذج "حصن" يثبت أن الابتكار الخوارزمي الوطني قادر على تحويل البيانات المناخية والبيئية إلى رادع أمني استثنائي يحفظ أرض الوطن وشبابه.
              </p>
            </div>
          </div>

          <a
            href="#map-section"
            className="px-6 py-3 bg-[#d4af37] hover:bg-amber-400 text-slate-950 font-black text-sm rounded-xl shadow-lg transition-all whitespace-nowrap"
          >
            الانتقال لغرفة العمليات
          </a>
        </div>

      </div>
    </section>
  );
};
