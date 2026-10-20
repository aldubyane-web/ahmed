import React, { useState } from 'react';
import { Flame, Trees, ShieldAlert, Cpu, Eye, CheckCircle2, ChevronRight, Layers, AlertTriangle } from 'lucide-react';

export const IntroductionSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'thermal' | 'vegetation' | 'fusion'>('thermal');

  return (
    <section id="intro" className="py-24 bg-[#070b13] relative border-t border-[#d4af37]/20">
      
      {/* Subtle gold ambient glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-amber-300 text-xs font-bold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>القسم الأول: الرؤية والمفهوم الاستخباري</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            تحويل بيانات حرائق <span className="text-amber-400 font-mono">NASA</span> إلى رادار أمني ذكي
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-6" />

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            كيف نجحت منصة <strong className="text-amber-300 font-bold">"حِصْن"</strong> في إعادة توظيف منظومة <span className="font-mono text-amber-200">FIRMS</span> المصممة أصلاً لرصد حرائق الغابات، وتحويلها إلى أداة تتبع فضائي لكشف أوكار التصنيع السري ومستودعات المخدرات والمزارع المحظورة.
          </p>
        </div>

        {/* Narrative Conceptual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
          
          {/* Text narrative */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#0b101c] border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#d4af37]/10 rounded-full blur-xl pointer-events-none" />
              
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <span>المعضلة الأمنية: التخفي في التضاريس الوعرة</span>
              </h3>
              
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                تعتمد شبكات تصنيع وتهريب المخدرات على استغلال وعورة جبال وحرار منطقة المدينة المنورة والمناطق الصحراوية النائية، بعيداً عن أعين الدوريات الأرضية، مستخدمين كهوفاً وتجاويف مغطاة بشباك تمويه تحجب الرؤية البصرية التقليدية.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0c1424] to-[#090d18] border border-[#d4af37]/30 shadow-[0_0_25px_rgba(212,175,55,0.12)]">
              <h3 className="text-xl font-bold text-amber-300 mb-3 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-amber-400" />
                <span>الحل المبتكر: معادلة البصمة المزدوجة</span>
              </h3>
              
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                طورت مبادرة <strong className="text-white">رواد الذكاء الاصطناعي</strong> خوارزمية تكامل تعتمد على رصد مؤشرين لا يمكن للمهربين إخفاؤهما من الفضاء:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#121b2f] border border-red-500/30 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-red-500/20 text-red-400 shrink-0">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-red-300">حرارة ليلية مستمرة</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-snug">
                      انبعاثات حرارية صناعية (&gt; 330K) تصدر عن مولدات ومعدات تقطير كيميائي تعمل ليلاً.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#121b2f] border border-emerald-500/30 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                    <Trees className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-300">نبات طيفي شاذ</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-snug">
                      طفرة في مؤشر NDVI (&gt; 0.35) تدل على زراعة مموهة مروية اصطناعياً في قلب الصحراء.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Concept Showcase Widget */}
          <div className="rounded-2xl bg-[#0a0f1b] border border-[#d4af37]/35 p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                <span>محاكاة استشعار البصمة الفضائية</span>
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                مباشر من الخوارزمية
              </span>
            </div>

            {/* Tab Selectors */}
            <div className="grid grid-cols-3 gap-2 p-1.5 rounded-xl bg-[#05070a] border border-slate-800 mb-5">
              <button
                onClick={() => setActiveTab('thermal')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'thermal'
                    ? 'bg-red-500/20 text-red-300 border border-red-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                1. الحرارة الليلية
              </button>
              <button
                onClick={() => setActiveTab('vegetation')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'vegetation'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                2. شذوذ النبات
              </button>
              <button
                onClick={() => setActiveTab('fusion')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'fusion'
                    ? 'bg-[#d4af37]/20 text-amber-300 border border-[#d4af37]/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                3. الدمج الذكي (حصن)
              </button>
            </div>

            {/* Tab Content Display */}
            {activeTab === 'thermal' && (
              <div className="space-y-4">
                <div className="relative h-56 rounded-xl bg-[#060910] border border-red-500/30 overflow-hidden p-4 flex flex-col justify-between">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(239,68,68,0.25),transparent_60%)]" />
                  <div className="flex justify-between items-start z-10">
                    <span className="text-xs font-mono text-red-400 bg-red-950/80 px-2.5 py-1 rounded border border-red-800">
                      SENSOR: VIIRS I4 Band (3.74 µm)
                    </span>
                    <span className="text-xs font-mono text-slate-300">02:30 AM AST</span>
                  </div>

                  <div className="z-10 flex flex-col items-center justify-center my-auto">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-red-600/30 animate-ping absolute inset-0" />
                      <div className="w-16 h-16 rounded-full bg-red-500/40 border-2 border-red-400 flex items-center justify-center relative">
                        <Flame className="w-8 h-8 text-red-300" />
                      </div>
                    </div>
                    <span className="text-base font-black text-red-400 mt-2 font-mono">
                      334.8 Kelvin (61.65°C)
                    </span>
                    <span className="text-xs text-slate-300 mt-0.5">
                      تطابق حراري لمولد كهربائي عالي الجهد في منطقة صحراوية معزولة
                    </span>
                  </div>

                  <div className="z-10 text-[11px] text-slate-400 flex justify-between border-t border-slate-800/80 pt-2">
                    <span>ليالٍ متتالية: 4 ليالٍ</span>
                    <span>التباين عن محيط الصحراء: +28.4K</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-[#0e1422] p-3 rounded-lg border border-slate-800">
                  <strong className="text-red-400">التفسير الأمني:</strong> النار العادية تنطفئ خلال ساعات، أما البصمة المستمرة لأكثر من 3 ليالٍ في ساعات الفجر الأولى فتعني وجود مصدر طاقة اصطناعي مستمر لأفران تقطير ومختبرات معالجة.
                </p>
              </div>
            )}

            {activeTab === 'vegetation' && (
              <div className="space-y-4">
                <div className="relative h-56 rounded-xl bg-[#060910] border border-emerald-500/30 overflow-hidden p-4 flex flex-col justify-between">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_50%,rgba(16,185,129,0.25),transparent_60%)]" />
                  <div className="flex justify-between items-start z-10">
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800">
                      SENSOR: Sentinel-2 MSI (B8/B4)
                    </span>
                    <span className="text-xs font-mono text-slate-300">NDVI Analysis</span>
                  </div>

                  <div className="z-10 flex flex-col items-center justify-center my-auto">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-emerald-600/30 animate-ping absolute inset-0" />
                      <div className="w-16 h-16 rounded-full bg-emerald-500/40 border-2 border-emerald-400 flex items-center justify-center relative">
                        <Trees className="w-8 h-8 text-emerald-300" />
                      </div>
                    </div>
                    <span className="text-base font-black text-emerald-400 mt-2 font-mono">
                      NDVI Delta = +0.41
                    </span>
                    <span className="text-xs text-slate-300 mt-0.5">
                      نشاط نباتي صناعي شاذ وسط أرض صخرية جرداء (الأساس: 0.04)
                    </span>
                  </div>

                  <div className="z-10 text-[11px] text-slate-400 flex justify-between border-t border-slate-800/80 pt-2">
                    <span>مساحة الحوض: 1,840 م²</span>
                    <span>مصدر المياه المقدر: بئر ارتوازي سري</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-[#0e1422] p-3 rounded-lg border border-slate-800">
                  <strong className="text-emerald-400">التفسير الأمني:</strong> مقارنة الصور الزمنية تكشف ظهور بقعة خضراء مفاجئة في وادٍ مهجور لم يشهد أمطاراً، وهو ما يقطع بوجود ري موضعي لزراعة شجيرات محظورة.
                </p>
              </div>
            )}

            {activeTab === 'fusion' && (
              <div className="space-y-4">
                <div className="relative h-56 rounded-xl bg-gradient-to-br from-[#0c1626] to-[#080d18] border border-[#d4af37]/50 overflow-hidden p-4 flex flex-col justify-between">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.2),transparent_70%)]" />
                  <div className="flex justify-between items-start z-10">
                    <span className="text-xs font-mono text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded border border-amber-800">
                      ALGORITHM: HISN-FUSION-v2.4
                    </span>
                    <span className="text-xs font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-800">
                      إنذار أمني مؤكد (96.4%)
                    </span>
                  </div>

                  <div className="z-10 flex flex-col items-center justify-center my-auto">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-red-600 border-2 border-amber-200 flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.6)]">
                      <ShieldAlert className="w-8 h-8 text-slate-950" />
                    </div>
                    <span className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 mt-2 font-mono">
                      هدف ذو أولوية قصوى: معمل تصنيع ومستودع
                    </span>
                    <span className="text-xs text-amber-200/90 mt-0.5">
                      تقاطع الحرارة المستمرة 334.8K + طفرة NDVI + انعزال جغرافي 0.72 كم
                    </span>
                  </div>

                  <div className="z-10 text-[11px] text-amber-300/80 flex justify-between border-t border-slate-800/80 pt-2">
                    <span>زمن الكشف التراكمي: 72 ساعة</span>
                    <span>التوصية: إحالة أمنية عاجلة لغرفة العمليات</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-[#0e1422] p-3 rounded-lg border border-[#d4af37]/30">
                  <strong className="text-amber-300">النتيجة الاستخبارية:</strong> يجمع نظام "حصن" البصمتين تلقائياً. بدلاً من إرسال طائرات استطلاع لكل حريق مؤقت، يركز التدخل فقط على الأهداف التي تلبي الشروط المزدوجة بدقة 94.6%.
                </p>
              </div>
            )}

          </div>

        </div>

        {/* 3 Core Paradigms Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-[#090e18] border border-slate-800 hover:border-[#d4af37]/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-[#d4af37]/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <span className="font-mono font-black text-lg">01</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">تخطي قيود الرصد البصري</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              الكاميرات والدرونز النهارية تعجز عن اختراق شباك التمويه والستائر الصخرية. الاستشعار الحراري بالأشعة تحت الحمراء يخترق الظلام والتمويه لرصد الانبعاثات الحيوية الداخلية.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#090e18] border border-slate-800 hover:border-[#d4af37]/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-[#d4af37]/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <span className="font-mono font-black text-lg">02</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">إعادة توظيف بيانات ناسا المجانية</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              استثمار البث الفضائي العالمي المفتوح عبر أقمار MODIS و VIIRS دون تكاليف تشغيل مدارية باهظة، وبناء خوارزمية فلترة وطنية متخصصة في مكافحة المخدرات.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#090e18] border border-slate-800 hover:border-[#d4af37]/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-[#d4af37]/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <span className="font-mono font-black text-lg">03</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">الاستباق بدل رد الفعل</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              ضبط المعامل والمستودعات في طور التجهيز والإنتاج الأولي خلال 72 ساعة، وإحباط سلاسل الإمداد قبل شروع المهربين في توزيع المواد المخدرة داخل المدن.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
