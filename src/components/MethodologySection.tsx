import React, { useState } from 'react';
import { Satellite, Database, Terminal, Sliders, Activity, Check, ArrowLeft, ShieldCheck, Filter, Radar, Flame, Trees, Cpu } from 'lucide-react';
import { ALGORITHM_STEPS } from '../data/mockData';

export const MethodologySection: React.FC = () => {
  // Interactive Algorithm Parameter Playground state for Phase 2
  const [tempThreshold, setTempThreshold] = useState<number>(335);
  const [s1CoherenceDrop, setS1CoherenceDrop] = useState<number>(45);
  const [ndviThreshold, setNdviThreshold] = useState<number>(0.35);
  const [landsatResolution, setLandsatResolution] = useState<number>(100);

  // Dynamic calculation for demonstration
  const estimatedRawAlerts = 142;
  // Formula: Final Score = (VIIRS * 0.3) + (Landsat * 0.3) + (S1 * 0.25) + (S2 * 0.15)
  const simulatedScore = Number((
    (96 * 0.3) + 
    ((tempThreshold > 330 ? 98 : 70) * 0.3) + 
    ((s1CoherenceDrop >= 40 ? 95 : 60) * 0.25) + 
    ((ndviThreshold >= 0.30 ? 92 : 65) * 0.15)
  ).toFixed(1));

  const isEscalatedRed = simulatedScore >= 90.0;
  const filteredVerified = isEscalatedRed ? 3 : 1;

  return (
    <section id="methodology" className="py-24 bg-[#05080f] relative border-t border-[#d4af37]/20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-amber-300 text-xs font-bold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>القسم الثاني: المنهجية الهندسية ونظام التأكيد الجنائي (مرحلة 2)</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            هندسة الاستشعار متعدد الأطياف والرادار <span className="gold-gradient-text">SAR</span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-6" />

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            الانتقال من مرحلة <strong className="text-amber-300">المسح الواسع (1 كم)</strong> إلى مرحلة <strong className="text-emerald-400">التأكيد الجنائي عالي الدقة (10م راداري و 70-100م حراري)</strong> عبر دمج 5 أقمار اصطناعية لتقليص البلاغات الكاذبة بنسبة 90%.
          </p>
        </div>

        {/* 1. Data Sources & Stack Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Data Sources - Phase 2 Constellation */}
          <div className="rounded-2xl bg-[#090e18] border border-slate-800 p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-800">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-[#d4af37]/30">
                  <Satellite className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">كوكبة الأقمار والمستشعرات المدمجة</h3>
                  <span className="text-xs text-slate-400">Multi-Mission Radar & Thermal Constellation</span>
                </div>
              </div>

              <div className="space-y-3.5">
                
                {/* VIIRS / MODIS (Wide Scan) */}
                <div className="p-3.5 rounded-xl bg-[#0e1422] border border-slate-800 flex items-start gap-3.5 hover:border-amber-500/40 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 font-mono font-bold text-xs text-center">
                    FIRMS<br/>375m
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">NASA FIRMS (VIIRS 375m & MODIS 1km)</h4>
                      <span className="text-[10px] font-mono text-amber-400">المسح الأولي</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      التقاط أولي للبؤر الحرارية بالأشعة تحت الحمراء كل 6 ساعات لتحديد المربعات الجغرافية المشبوهة عبر منطقة المدينة المنورة.
                    </p>
                  </div>
                </div>

                {/* Landsat 8/9 TIRS & ECOSTRESS (High-Res Thermal) */}
                <div className="p-3.5 rounded-xl bg-[#0e1422] border border-amber-500/40 flex items-start gap-3.5 hover:border-amber-400 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                  <div className="w-12 h-12 rounded-lg bg-amber-500/15 border border-amber-500/50 flex items-center justify-center text-amber-300 shrink-0 font-mono font-bold text-xs text-center">
                    TIRS<br/>100m
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-amber-200">Landsat 8/9 TIRS (Band 10) & ECOSTRESS (70m)</h4>
                      <span className="text-[10px] font-mono text-amber-400">تأكيد حراري جنائي</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      حسم قطعي: التمييز الفيزيائي بين انبعاث محركات الديزل ومولدات التصنيع (336K مستمر فجراً) وبين الحرارة الشمسية الطبيعية لصخور الحرات البازلتية التي تتشتت ليلاً.
                    </p>
                  </div>
                </div>

                {/* Sentinel-1 GRD SAR InSAR Coherence (Radar) */}
                <div className="p-3.5 rounded-xl bg-[#0e1422] border border-red-500/40 flex items-start gap-3.5 hover:border-red-400 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                  <div className="w-12 h-12 rounded-lg bg-red-500/15 border border-red-500/50 flex items-center justify-center text-red-400 shrink-0 font-mono font-bold text-xs text-center">
                    SAR<br/>InSAR
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-red-300">Sentinel-1 GRD + InSAR Coherence (Google Earth Engine)</h4>
                      <span className="text-[10px] font-mono text-red-400">رادار يخترق الغيوم والليل</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      الرادار الذي لا يكذب: إذا انخفض التماسك الراداري InSAR بنسبة &gt; 40% خلال دورة 12 يوماً، فهذا يثبت حفر خنادق أرضية واستحداث هياكل مموهة حتى لو حُجبت بالكامل بصرياً.
                    </p>
                  </div>
                </div>

                {/* Sentinel-2 MSI (Optical & NDVI) */}
                <div className="p-3.5 rounded-xl bg-[#0e1422] border border-emerald-500/30 flex items-start gap-3.5 hover:border-emerald-500/50 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 font-mono font-bold text-xs text-center">
                    S-2<br/>10m
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-emerald-300">Sentinel-2 True Color (10m) & NDVI Delta</h4>
                      <span className="text-[10px] font-mono text-emerald-400">بصري وطيفي</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      تصوير بصري حقيقي بدقة 10 أمتار لرسم شبكة الهدف واستخراج طفرات مؤشر الغطاء النباتي المروي سراً في المناطق الصحراوية.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>تغطية رادارية وحرارية شاملة للمدينة المنورة</span>
              <span className="font-mono text-amber-400">24.4672° N, 39.6111° E</span>
            </div>
          </div>

          {/* Tools & Engineering Stack */}
          <div className="rounded-2xl bg-[#090e18] border border-slate-800 p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-800">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-[#d4af37]/30">
                  <Terminal className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">المنصات وحزمة التحليل الراداري الجنائي</h3>
                  <span className="text-xs text-slate-400">Google Earth Engine & Process API Pipeline</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5 mb-5">
                
                <div className="p-4 rounded-xl bg-[#0d121e] border border-slate-800">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase">Google Earth Engine</span>
                  <h4 className="text-sm font-bold text-white mt-1">حساب InSAR Coherence</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-snug">
                    استدعاء سلاسل صور Sentinel-1 وحساب الفرق الزمني للتماسك الراداري تلقائياً.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0d121e] border border-slate-800">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase">Sentinel Hub Process API</span>
                  <h4 className="text-sm font-bold text-white mt-1">بث الصور البصرية 10م</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-snug">
                    سحب لقطات True Color عالية الدقة لمطابقة إحداثيات الهدف عند تأكيد الإنذار.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0d121e] border border-slate-800">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase">USGS Landsat Collection 2</span>
                  <h4 className="text-sm font-bold text-white mt-1">معايرة TIRS L2 LST</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-snug">
                    تحويل إشعاع القناة 10 إلى درجة حرارة سطحية مطلقة بالكلفن بدقة 100م.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0d121e] border border-slate-800">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase">معادلة الدمج الجنائي</span>
                  <h4 className="text-sm font-bold text-white mt-1">الأوزان التراكمية الأربعة</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-snug">
                    30% VIIRS + 30% Landsat + 25% SAR + 15% NDVI مع تصعيد آلي فوق 90%.
                  </p>
                </div>

              </div>

              {/* Terminal Code Snippet Preview */}
              <div className="rounded-xl bg-[#04060a] border border-slate-800 p-3.5 font-mono text-[11px] text-slate-300 overflow-x-auto text-left dir-ltr">
                <div className="text-slate-500 mb-1"># Phase 2 High-Accuracy Forensic Fusion Pipeline</div>
                <div className="text-emerald-400">
                  <span className="text-amber-400">def</span> calculate_forensic_fusion(viirs, landsat_tirs, s1_drop, s2_ndvi):
                </div>
                <div className="pl-4 text-slate-300">
                  score = (viirs * 0.30) + (landsat_tirs * 0.30) + (s1_drop * 0.25) + (s2_ndvi * 0.15)
                </div>
                <div className="pl-4 text-amber-300">
                  is_red_alert = score &gt; 90.0 <span className="text-slate-500"># Escalation trigger</span>
                </div>
                <div className="pl-4 text-emerald-300">
                  <span className="text-amber-400">return</span> {"{"} "score": score, "escalate_red": is_red_alert {"}"}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>تكامل حقيقي مع بروتوكولات Google Earth Engine</span>
              <span className="text-emerald-400 font-mono">Status: Production Grade</span>
            </div>
          </div>

        </div>

        {/* 2. Four Operational Pipeline Stages */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              مراحل آلية العمل الخوارزمية (المرحلة 2: التأكيد الجنائي)
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              كيف ننتقل من مسح الـ 1 كم إلى الحسم الجنائي بدقة 10م راداري و 100م حراري
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ALGORITHM_STEPS.map((step) => (
              <div
                key={step.step}
                className="rounded-2xl bg-[#090e18] border border-[#d4af37]/30 p-6 shadow-xl relative flex flex-col justify-between hover:border-amber-400 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#d4af37] to-amber-600 text-slate-950 font-black text-base flex items-center justify-center shadow-md">
                      {step.step}
                    </span>
                    <span className="text-[11px] font-mono text-amber-300 bg-[#d4af37]/10 px-2 py-0.5 rounded border border-[#d4af37]/30 font-semibold">
                      {step.highlight}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                    {step.title}
                  </h4>
                  <span className="text-[11px] font-mono text-slate-400 block mb-3">
                    {step.en}
                  </span>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Stack:</span>
                  <span className="text-amber-400 truncate max-w-[140px]">{step.tech}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Interactive Parameter Simulator Widget (Phase 2 Enhanced) */}
        <div className="rounded-2xl bg-gradient-to-br from-[#0c1322] to-[#070b13] border border-[#d4af37]/40 p-6 sm:p-8 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-amber-400" />
                <h3 className="text-xl font-bold text-white">
                  محاكي معادلة الدمج الجنائي (Phase 2 Fusion Simulator)
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                جرب تغيير عتبة هبوط التماسك الراداري InSAR وحرارة Landsat TIRS وشاهد تصعيد الإنذار التلقائي إلى أحمر فوق 90%
              </p>
            </div>

            <button
              onClick={() => {
                setTempThreshold(336);
                setS1CoherenceDrop(46);
                setNdviThreshold(0.35);
                setLandsatResolution(100);
              }}
              className="text-xs px-3.5 py-1.5 rounded-lg bg-[#d4af37]/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/40 text-amber-300 font-semibold transition-colors cursor-pointer"
            >
              استعادة قيم الهدف المؤكد (وادي العقيق)
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            {/* Sliders Area */}
            <div className="lg:col-span-2 space-y-5">
              
              {/* Slider 1: Sentinel-1 InSAR Coherence Drop */}
              <div className="p-4 rounded-xl bg-[#080c16] border border-red-500/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Radar className="w-4 h-4 text-red-400" />
                    <span>1. نسبة هبوط التماسك الراداري InSAR (دورة 12 يوماً):</span>
                  </span>
                  <span className={`text-sm font-mono font-bold ${s1CoherenceDrop >= 40 ? 'text-red-400' : 'text-amber-400'}`}>
                    -{s1CoherenceDrop}% {s1CoherenceDrop >= 40 ? '(حفر مؤكد > 40%)' : '(مستقر)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="65"
                  step="1"
                  value={s1CoherenceDrop}
                  onChange={(e) => setS1CoherenceDrop(Number(e.target.value))}
                  className="w-full accent-red-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>10% (تربة مستقرة)</span>
                  <span className="text-red-400 font-bold">40% (عتبة التأكيد الجنائي للحفر)</span>
                  <span>65% (انهيار تضاريسي كامل)</span>
                </div>
              </div>

              {/* Slider 2: Landsat TIRS Band 10 Temperature */}
              <div className="p-4 rounded-xl bg-[#080c16] border border-amber-500/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>2. حرارة Landsat TIRS Band 10 (دقة 100م):</span>
                  </span>
                  <span className="text-sm font-mono font-bold text-amber-400">
                    {tempThreshold} K ({(tempThreshold - 273.15).toFixed(1)}°C)
                  </span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="355"
                  step="1"
                  value={tempThreshold}
                  onChange={(e) => setTempThreshold(Number(e.target.value))}
                  className="w-full accent-[#d4af37] bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>305K (حرارة البازلت المشتتة ليلاً)</span>
                  <span className="text-amber-400 font-bold">330K-336K (حرارة محركات ومولدات)</span>
                  <span>355K (أفران تقطير)</span>
                </div>
              </div>

              {/* Slider 3: NDVI Delta */}
              <div className="p-4 rounded-xl bg-[#080c16] border border-slate-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Trees className="w-4 h-4 text-emerald-400" />
                    <span>3. فارق مؤشر الغطاء النباتي (Sentinel-2 NDVI Delta):</span>
                  </span>
                  <span className="text-sm font-mono font-bold text-emerald-400">
                    +{ndviThreshold.toFixed(2)} Delta
                  </span>
                </div>
                <input
                  type="range"
                  min="0.10"
                  max="0.60"
                  step="0.05"
                  value={ndviThreshold}
                  onChange={(e) => setNdviThreshold(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>0.10 (شجيرات طبيعية)</span>
                  <span className="text-emerald-400 font-bold">0.35 (عتبة زراعة مموهة مروية)</span>
                  <span>0.60 (كثافة عالية)</span>
                </div>
              </div>

            </div>

            {/* Results Live Badge */}
            <div className={`rounded-xl border p-6 flex flex-col items-center text-center justify-between h-full ${
              isEscalatedRed
                ? 'bg-red-950/30 border-red-500/60 shadow-[0_0_25px_rgba(239,68,68,0.3)]'
                : 'bg-[#060910] border-amber-500/40'
            }`}>
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">
                  نتيجة السكور الخوارزمي المدمج
                </span>
                <div className="mt-3 mb-1">
                  <span className={`text-5xl font-black font-mono ${isEscalatedRed ? 'text-red-400' : 'text-amber-400'}`}>
                    {simulatedScore}%
                  </span>
                </div>
                <div className={`text-xs font-bold mt-1 px-3 py-1 rounded-full border inline-block ${
                  isEscalatedRed
                    ? 'bg-red-900/60 text-red-200 border-red-500 animate-pulse'
                    : 'bg-amber-900/60 text-amber-200 border-amber-600'
                }`}>
                  {isEscalatedRed
                    ? 'تم التصعيد لإنذار أحمر مؤكد (Score > 90%)'
                    : 'إنذار أصفر تحت الرصد المستمر'}
                </div>
              </div>

              <div className="w-full my-4 py-3 px-4 rounded-lg bg-[#0e1422] border border-slate-800 text-xs text-right space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>دقة التأكيد الجنائي:</span>
                  <span className="text-emerald-400 font-mono font-bold">98.2%</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>تقليص البلاغات الكاذبة:</span>
                  <span className="text-amber-300 font-mono font-bold">90.0% تقليص مؤكد</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>اختراق شباك التمويه:</span>
                  <span className="text-emerald-400 font-mono font-bold">بنبضات رادار SAR</span>
                </div>
              </div>

              <div className="w-full flex items-center justify-center gap-2 text-xs font-bold text-amber-300 bg-[#d4af37]/10 py-2 rounded-lg border border-[#d4af37]/30">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>مطابق لمعايير اللجنة الأمنية والتقنية</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
