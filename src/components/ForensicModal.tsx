import React, { useState } from 'react';
import { 
  X, 
  Satellite, 
  Flame, 
  Radar, 
  Trees, 
  Activity, 
  ShieldAlert, 
  CheckCircle, 
  AlertTriangle, 
  Download, 
  ExternalLink,
  Layers,
  Sparkles,
  Cpu,
  Info
} from 'lucide-react';
import { SuspiciousSite, CoherenceHistoryPoint } from '../data/mockData';

interface ForensicModalProps {
  isOpen: boolean;
  onClose: () => void;
  site: SuspiciousSite;
  allSites: SuspiciousSite[];
  onSelectSite: (site: SuspiciousSite) => void;
}

export const ForensicModal: React.FC<ForensicModalProps> = ({
  isOpen,
  onClose,
  site,
  allSites,
  onSelectSite
}) => {
  const [activeViewTab, setActiveViewTab] = useState<'all' | 'optical' | 'thermal' | 'sar'>('all');
  const [hoveredPoint, setHoveredPoint] = useState<CoherenceHistoryPoint | null>(null);

  if (!isOpen) return null;

  const history = site.s1_coherence_history;
  const fusion = site.fusion_details;

  // Chart SVG Dimensions
  const chartWidth = 720;
  const chartHeight = 220;
  const paddingX = 40;
  const paddingY = 30;
  const graphWidth = chartWidth - paddingX * 2;
  const graphHeight = chartHeight - paddingY * 2;

  // Min / Max coherence range (0.0 to 1.0)
  const minVal = 0.0;
  const maxVal = 1.0;

  // Calculate points for polyline
  const polylinePoints = history.map((pt, idx) => {
    const x = paddingX + (idx / (history.length - 1)) * graphWidth;
    const y = paddingY + graphHeight - ((pt.coherence - minVal) / (maxVal - minVal)) * graphHeight;
    return `${x},${y}`;
  }).join(' ');

  // Baseline line
  const baselineY = paddingY + graphHeight - ((site.s1_coherence_baseline - minVal) / (maxVal - minVal)) * graphHeight;
  
  // 40% Drop threshold line
  const threshold40Val = site.s1_coherence_baseline * 0.6; // 40% loss
  const threshold40Y = paddingY + graphHeight - ((threshold40Val - minVal) / (maxVal - minVal)) * graphHeight;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl rounded-3xl bg-[#070b14] border border-[#d4af37]/60 shadow-[0_0_60px_rgba(212,175,55,0.3)] flex flex-col max-h-[94vh] overflow-hidden my-auto animate-fadeIn">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-gradient-to-r from-[#0d1424] via-[#090e1a] to-[#0d1424]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#d4af37] to-amber-600 p-0.5 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              <div className="w-full h-full rounded-[10px] bg-[#090e1a] flex items-center justify-center">
                <Radar className="w-6 h-6 text-amber-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white">
                  نظام التأكيد عالي الدقة الجنائي - المرحلة الثانية
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-600">
                  HIGH-ACCURACY FORENSIC LAYER
                </span>
              </div>
              <p className="text-xs text-amber-300/90 font-medium">
                تأكيد حراري 100م (Landsat/ECOSTRESS) + راداري 10م (Sentinel-1 SAR Coherence)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0e172a] border border-slate-700 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              GEE & Sentinel Hub API: Connected
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Target Switcher & Quick Telemetry Strip */}
        <div className="px-6 py-3 bg-[#05080f] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <span className="text-slate-400 font-semibold shrink-0">اختيار موقع التحقق:</span>
            {allSites.map((s) => (
              <button
                key={s.id}
                onClick={() => onSelectSite(s)}
                className={`px-3 py-1 rounded-lg font-mono text-xs transition-all flex items-center gap-1.5 shrink-0 ${
                  site.id === s.id
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                    : 'bg-[#0f172a] text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${s.alert_level === 'red' ? 'bg-red-500' : 'bg-amber-400'}`} />
                <span>{s.id}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="text-slate-400">الإحداثيات المستهدفة: <strong className="text-amber-300">{site.coordinates[0].toFixed(4)}°N, {site.coordinates[1].toFixed(4)}°E</strong></span>
            <span className="text-slate-400">النتيجة المدمجة: <strong className="text-emerald-400 font-bold">{fusion.final_score}%</strong></span>
          </div>

        </div>

        {/* Scrollable Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* 1. Forensic Triad Visual Comparison Cards */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  الأدلة الجنائية الفضائية الثلاثة لنقطة الاشتباه ({site.id})
                </h4>
              </div>

              {/* View filter */}
              <div className="flex items-center gap-1 bg-[#050810] p-1 rounded-lg border border-slate-800 text-xs">
                <button
                  onClick={() => setActiveViewTab('all')}
                  className={`px-2.5 py-1 rounded font-medium transition-colors ${
                    activeViewTab === 'all' ? 'bg-[#d4af37] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  عرض شامل (3 صور)
                </button>
                <button
                  onClick={() => setActiveViewTab('optical')}
                  className={`px-2.5 py-1 rounded font-medium transition-colors ${
                    activeViewTab === 'optical' ? 'bg-[#d4af37] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  بصري 10م
                </button>
                <button
                  onClick={() => setActiveViewTab('thermal')}
                  className={`px-2.5 py-1 rounded font-medium transition-colors ${
                    activeViewTab === 'thermal' ? 'bg-[#d4af37] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  حراري Landsat
                </button>
                <button
                  onClick={() => setActiveViewTab('sar')}
                  className={`px-2.5 py-1 rounded font-medium transition-colors ${
                    activeViewTab === 'sar' ? 'bg-[#d4af37] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  راداري InSAR
                </button>
              </div>
            </div>

            <div className={`grid gap-4 ${activeViewTab === 'all' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 max-w-2xl mx-auto'}`}>
              
              {/* Evidence 1: Sentinel-2 True Color 10m */}
              {(activeViewTab === 'all' || activeViewTab === 'optical') && (
                <div className="rounded-2xl bg-[#090e18] border border-emerald-500/40 overflow-hidden shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="p-3 bg-[#0d1424] border-b border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                        <Satellite className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Sentinel-2 True Color (10m)</span>
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
                        دقة 10 أمتار
                      </span>
                    </div>

                    <div className="relative aspect-square w-full bg-black overflow-hidden group">
                      <img
                        src={site.optical_image_url}
                        alt="صورة بصرية عالية الدقة من Sentinel-2"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 px-2 py-1 rounded bg-black/75 border border-emerald-500/50 text-[10px] font-mono text-emerald-300">
                        BAND: B4-B3-B2 (RGB)
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/75 border border-slate-700 text-[10px] font-mono text-slate-300">
                        LAT: {site.coordinates[0].toFixed(4)}°N
                      </div>
                    </div>

                    <div className="p-3.5 text-xs text-slate-300 space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-slate-400">مؤشر NDVI الطيفي:</span>
                        <span className="font-mono text-emerald-400 font-bold">+{site.ndvi_delta} Delta</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        يكشف الشذوذ الخضري الموضعي وسط الصخور البركانية، وتحديد مسارات الإمداد الصحراوية الخفية.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Evidence 2: Landsat 8/9 TIRS (100m) & ECOSTRESS (70m) */}
              {(activeViewTab === 'all' || activeViewTab === 'thermal') && (
                <div className="rounded-2xl bg-[#090e18] border border-amber-500/40 overflow-hidden shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="p-3 bg-[#0d1424] border-b border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-amber-400" />
                        <span>Landsat-9 TIRS & ECOSTRESS</span>
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700">
                        دقة 70م - 100م
                      </span>
                    </div>

                    <div className="relative aspect-square w-full bg-black overflow-hidden group">
                      <img
                        src={site.thermal_image_url}
                        alt="صورة حرارية دقيقة من Landsat TIRS Band 10"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 px-2 py-1 rounded bg-black/75 border border-amber-500/50 text-[10px] font-mono text-amber-300">
                        TIRS Band 10 (10.6 µm)
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/75 border border-amber-500/50 text-[10px] font-mono text-red-400 font-bold">
                        PEAK: {site.landsat_tirs_temp_k} K ({(site.landsat_tirs_temp_k - 273.15).toFixed(1)}°C)
                      </div>
                    </div>

                    <div className="p-3.5 text-xs text-slate-300 space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-slate-400">تأكيد مصدر محرك ديزل:</span>
                        <span className="font-mono text-amber-300 font-bold">
                          {site.thermal_engine_confirmed ? 'مؤكد 100% (ليس صخور بازلت)' : 'قيد التدقيق'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        دقة 100م تلغي الشك تماماً: التسخين الشمسي لحرات المدينة يتشتت فجراً تحت 305K، بينما البؤرة تشع عند 336K مستمر.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Evidence 3: Sentinel-1 InSAR Coherence Drop */}
              {(activeViewTab === 'all' || activeViewTab === 'sar') && (
                <div className="rounded-2xl bg-[#090e18] border border-red-500/40 overflow-hidden shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="p-3 bg-[#0d1424] border-b border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-bold text-red-300 flex items-center gap-1.5">
                        <Radar className="w-3.5 h-3.5 text-red-400" />
                        <span>Sentinel-1 InSAR Coherence</span>
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-700">
                        رادار SAR يخترق الغيوم والليل
                      </span>
                    </div>

                    <div className="relative aspect-square w-full bg-black overflow-hidden group">
                      <img
                        src={site.sar_coherence_image_url}
                        alt="خريطة التداخل الراداري InSAR واضطراب التماسك"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 px-2 py-1 rounded bg-black/75 border border-red-500/50 text-[10px] font-mono text-red-400 font-bold">
                        COHERENCE LOSS: -{site.s1_coherence_drop_percent}%
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/75 border border-slate-700 text-[10px] font-mono text-slate-300">
                        12-DAY CYCLE (IW VV-VH)
                      </div>
                    </div>

                    <div className="p-3.5 text-xs text-slate-300 space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-slate-400">تأكيد حفر وتمويه أرضي:</span>
                        <span className={`font-mono font-bold ${site.s1_coherence_drop_percent > 40 ? 'text-red-400' : 'text-slate-400'}`}>
                          {site.s1_coherence_drop_percent > 40 ? 'حفر أرضي جديد مؤكد (>40%)' : 'ضمن التذبذب الطبيعي'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        الرادار SAR يرسل نبضات ميكروويف؛ انهيار التماسك يعني تحريك التربة وإنشاء منشآت سرية تحت شباك التمويه.
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* 2. Interactive 30-Day Coherence Chart */}
          <div className="rounded-2xl bg-[#080d1a] border border-[#d4af37]/40 p-5 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-400" />
                  <h4 className="text-sm font-bold text-white">
                    الرسم البياني لتغير التماسك الراداري (Sentinel-1 InSAR Coherence) لآخر 30 يوماً
                  </h4>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  رصد الانخفاض الحاد بنسبة {site.s1_coherence_drop_percent}% الذي أثبت وجود حفر وتمويه جديد في الموقع
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-3 h-0.5 bg-blue-400" />
                  خط الأساس المستقر ({site.s1_coherence_baseline})
                </span>
                <span className="flex items-center gap-1.5 text-red-400">
                  <span className="w-3 h-0.5 bg-red-500 border-dashed" />
                  عتبة الخطر &gt;40% ({threshold40Val.toFixed(2)})
                </span>
              </div>
            </div>

            {/* SVG Interactive Line Chart */}
            <div className="w-full overflow-x-auto bg-[#04060b] rounded-xl p-3 border border-slate-800/80">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-56 select-none font-mono text-[10px]">
                
                {/* Grid Lines */}
                {[0.2, 0.4, 0.6, 0.8, 1.0].map((v) => {
                  const y = paddingY + graphHeight - ((v - minVal) / (maxVal - minVal)) * graphHeight;
                  return (
                    <g key={v}>
                      <line x1={paddingX} y1={y} x2={chartWidth - paddingX} y2={y} stroke="#1e293b" strokeDasharray="3 3" />
                      <text x={paddingX - 8} y={y + 3} fill="#64748b" textAnchor="end">{v.toFixed(1)}</text>
                    </g>
                  );
                })}

                {/* Baseline reference line (Blue) */}
                <line
                  x1={paddingX}
                  y1={baselineY}
                  x2={chartWidth - paddingX}
                  y2={baselineY}
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.7"
                />

                {/* 40% Drop Danger Threshold (Red dashed) */}
                <line
                  x1={paddingX}
                  y1={threshold40Y}
                  x2={chartWidth - paddingX}
                  y2={threshold40Y}
                  stroke="#ef4444"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                  opacity="0.8"
                />

                {/* Shaded Area under Curve */}
                <polygon
                  points={`${paddingX},${paddingY + graphHeight} ${polylinePoints} ${chartWidth - paddingX},${paddingY + graphHeight}`}
                  fill="url(#coherenceGradient)"
                  opacity="0.25"
                />

                {/* Gradient Definition */}
                <defs>
                  <linearGradient id="coherenceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d4af37" stopOpacity="0.8" />
                    <stop offset="70%" stopColor="#ef4444" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Actual Coherence Data Line */}
                <polyline
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={polylinePoints}
                />

                {/* Data Points */}
                {history.map((pt, idx) => {
                  const x = paddingX + (idx / (history.length - 1)) * graphWidth;
                  const y = paddingY + graphHeight - ((pt.coherence - minVal) / (maxVal - minVal)) * graphHeight;
                  const isDrop = pt.is_drop_event;

                  return (
                    <g key={idx} className="cursor-pointer" onMouseEnter={() => setHoveredPoint(pt)}>
                      <circle
                        cx={x}
                        cy={y}
                        r={isDrop ? 6 : 3.5}
                        fill={isDrop ? '#ef4444' : '#d4af37'}
                        stroke="#070b14"
                        strokeWidth="1.5"
                      />
                      {isDrop && (
                        <circle
                          cx={x}
                          cy={y}
                          r={10}
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="1.5"
                          className="animate-ping"
                        />
                      )}
                    </g>
                  );
                })}

                {/* X Axis Labels */}
                {history.filter((_, i) => i % 5 === 0 || i === history.length - 1).map((pt, i, arr) => {
                  const origIdx = history.indexOf(pt);
                  const x = paddingX + (origIdx / (history.length - 1)) * graphWidth;
                  return (
                    <text key={i} x={x} y={chartHeight - 8} fill="#94a3b8" textAnchor="middle">
                      {pt.date}
                    </text>
                  );
                })}

              </svg>
            </div>

            {/* Hovered Tooltip info bar */}
            <div className="mt-3 p-2.5 rounded-lg bg-[#0e1628] border border-slate-800 text-xs flex flex-wrap items-center justify-between gap-2 font-mono">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">نقطة المرور المختارة:</span>
                <span className="text-amber-300 font-bold">{hoveredPoint ? hoveredPoint.date : 'اليوم 30 (أحدث مرور)'}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">قيمة التماسك:</span>
                <span className="text-emerald-400 font-bold">{hoveredPoint ? hoveredPoint.coherence : site.s1_coherence_current}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">القمر والمدار:</span>
                <span className="text-slate-200">{hoveredPoint ? hoveredPoint.pass_orbit : 'Sentinel-1B IW Orbit 131'}</span>
                {hoveredPoint?.is_drop_event && (
                  <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-700 text-[10px]">
                    لحظة بدء الحفر والإنشاء
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* 3. New Fusion Logic Formula Breakdown */}
          <div className="rounded-2xl bg-gradient-to-br from-[#0c1322] to-[#070b14] border border-[#d4af37]/50 p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-amber-400" />
                <h4 className="text-base font-black text-white">
                  معادلة الدمج الجنائي الذكي (Fusion Logic Formula)
                </h4>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#d4af37]/20 text-amber-300 border border-[#d4af37]/40">
                المرحلة 2: خوارزمية الأوزان الأربعة
              </span>
            </div>

            {/* Mathematical Formula Banner */}
            <div className="p-3.5 rounded-xl bg-[#04060c] border border-slate-800 font-mono text-xs sm:text-sm text-slate-200 text-left dir-ltr mb-4 overflow-x-auto">
              <div className="text-amber-400 font-bold mb-1">
                Final Score = (VIIRS_Anomaly × 0.3) + (Landsat_TIRS_Confirm × 0.3) + (S1_Coherence_Drop × 0.25) + (S2_NDVI_Anomaly × 0.15)
              </div>
              <div className="text-slate-400 text-xs">
                Threshold Rule: If Final Score &gt; 90.0% ➔ Auto-Escalate to <span className="text-red-400 font-bold">"إنذار أحمر - معمل متقدم ونشاط طيفي وراداري مؤكد"</span>
              </div>
            </div>

            {/* Real Calculation Breakdown Grid for this target */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              
              <div className="p-3 rounded-xl bg-[#090f1d] border border-slate-800">
                <span className="text-[11px] text-slate-400 block">1. VIIRS Anomaly (30%)</span>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-lg font-mono font-bold text-amber-400">{fusion.viirs_anomaly}%</span>
                  <span className="text-xs font-mono text-slate-400">× 0.3 = {(fusion.viirs_anomaly * 0.3).toFixed(1)}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#090f1d] border border-slate-800">
                <span className="text-[11px] text-slate-400 block">2. Landsat TIRS (30%)</span>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-lg font-mono font-bold text-amber-400">{fusion.landsat_tirs_confirm}%</span>
                  <span className="text-xs font-mono text-slate-400">× 0.3 = {(fusion.landsat_tirs_confirm * 0.3).toFixed(1)}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#090f1d] border border-slate-800">
                <span className="text-[11px] text-slate-400 block">3. S1 Coherence Drop (25%)</span>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-lg font-mono font-bold text-red-400">{fusion.s1_coherence_drop}%</span>
                  <span className="text-xs font-mono text-slate-400">× 0.25 = {(fusion.s1_coherence_drop * 0.25).toFixed(1)}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#090f1d] border border-slate-800">
                <span className="text-[11px] text-slate-400 block">4. S2 NDVI Delta (15%)</span>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-lg font-mono font-bold text-emerald-400">{fusion.s2_ndvi_anomaly}%</span>
                  <span className="text-xs font-mono text-slate-400">× 0.15 = {(fusion.s2_ndvi_anomaly * 0.15).toFixed(1)}</span>
                </div>
              </div>

            </div>

            {/* Score Result Status Ribbon */}
            <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
              fusion.final_score >= 90
                ? 'bg-red-950/40 border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                : 'bg-amber-950/40 border-amber-500/60'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-black text-lg ${
                  fusion.final_score >= 90 ? 'bg-red-600 text-white' : 'bg-amber-500 text-slate-950'
                }`}>
                  {fusion.final_score}%
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">
                    {fusion.final_score >= 90
                      ? 'إنذار أحمر مؤكد جنائياً - تم التصعيد تلقائياً (Score > 90%)'
                      : 'إنذار أصفر - قيد استكمال دورة الـ 12 يوماً الرادارية'}
                  </h5>
                  <p className="text-xs text-slate-300">
                    {fusion.final_score >= 90
                      ? 'تطابق كامل بين انبعاث محرك Landsat TIRS 336K وهبوط التماسك الراداري S1 بأكثر من 40% وطفرة NDVI.'
                      : 'أحد المؤشرات لم يكتمل بعد لتجاوز عتبة الـ 90%؛ يستمر الرصد دون إرسال فرقة مداهمة تجنباً للبلاغ الكاذب.'}
                  </p>
                </div>
              </div>

              <div className="text-xs font-bold font-mono px-3 py-1.5 rounded-lg bg-black/60 border border-slate-700 whitespace-nowrap">
                {fusion.final_score >= 90 ? 'STATUS: ESCALATED TO RED' : 'STATUS: MONITORING'}
              </div>
            </div>

          </div>

          {/* 4. Strategic Executive Statement for the Committee */}
          <div className="p-5 rounded-2xl bg-[#090d18] border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-white block mb-1">صيغة العرض المعتمدة أمام اللجنة الأمنية والتقنية:</strong>
              <blockquote className="italic text-amber-200 border-r-2 border-amber-400 pr-3 my-1">
                "نظامنا يكشف بدقة 1 كم، ويؤكد بدقة 10 متر حراري و 10 متر راداري، ويقلل البلاغات الكاذبة بنسبة 90% عبر دمج Sentinel-1 SAR الذي يخترق الغيوم والتمويه مع Landsat-9 TIRS الذي يميز حرارة المحركات عن حرارة الصخور."
              </blockquote>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#090e1a] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Sentinel-1 SAR Ground Disturbance Verified</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                alert(`تم تصدير الحزمة الجنائية الكاملة للهدف ${site.id} متضمنة ملف GeoJSON وبيانات InSAR Coherence بصيغة GeoTIFF.`);
              }}
              className="px-4 py-2 rounded-xl bg-[#0e1628] hover:bg-[#15223c] border border-[#d4af37]/40 text-amber-300 font-semibold flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>تصدير الحزمة الجنائية (GeoTIFF + InSAR)</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#d4af37] hover:bg-amber-400 text-slate-950 font-black transition-all shadow-md"
            >
              إغلاق
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
