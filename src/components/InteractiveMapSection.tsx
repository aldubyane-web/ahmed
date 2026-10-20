import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Radio, 
  MapPin, 
  ShieldAlert, 
  Flame, 
  Trees, 
  Layers, 
  Eye, 
  Maximize2, 
  RotateCcw, 
  Terminal, 
  CheckCircle, 
  AlertTriangle,
  Download,
  Share2,
  Navigation,
  Radar,
  Activity,
  Sparkles,
  Cpu
} from 'lucide-react';
import { SUSPICIOUS_SITES_MOCK, SuspiciousSite } from '../data/mockData';
import { ApiInspectorModal } from './ApiInspectorModal';
import { ForensicModal } from './ForensicModal';

export const InteractiveMapSection: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const circlesLayerRef = useRef<L.LayerGroup | null>(null);

  const [selectedSite, setSelectedSite] = useState<SuspiciousSite | null>(SUSPICIOUS_SITES_MOCK[0]);
  const [filterLevel, setFilterLevel] = useState<'all' | 'red' | 'yellow'>('all');
  const [showBuffers, setShowBuffers] = useState<boolean>(true);
  const [mapType, setMapType] = useState<'dark' | 'satellite'>('dark');
  const [isApiModalOpen, setIsApiModalOpen] = useState<boolean>(false);
  const [isForensicModalOpen, setIsForensicModalOpen] = useState<boolean>(false);
  const [apiData, setApiData] = useState<any>(null);
  const [isApiLoading, setIsApiLoading] = useState<boolean>(false);
  const [dispatchAlertSuccess, setDispatchAlertSuccess] = useState<boolean>(false);

  // Function to fetch the mock API
  const fetchMockApi = async () => {
    setIsApiLoading(true);
    try {
      const baseUrl = import.meta.env.BASE_URL || '/';
      const apiUrl = baseUrl.endsWith('/') ? `${baseUrl}api/suspicious/madinah` : `${baseUrl}/api/suspicious/madinah`;
      let res = await fetch(apiUrl).catch(() => null);
      if (!res || !res.ok) {
        res = await fetch('/api/suspicious/madinah').catch(() => null);
      }
      if (res && res.ok) {
        const json = await res.json();
        setApiData(json);
      } else {
        // Fallback
        setApiData({
          status: "success",
          region: "المدينة المنورة",
          timestamp: new Date().toISOString(),
          algorithm: "HISN-FORENSIC-v2.0 (Phase 2)",
          sites: SUSPICIOUS_SITES_MOCK.slice(0, 3)
        });
      }
    } catch {
      setApiData({
        status: "success",
        region: "المدينة المنورة",
        timestamp: new Date().toISOString(),
        algorithm: "HISN-FORENSIC-v2.0 (Phase 2)",
        sites: SUSPICIOUS_SITES_MOCK.slice(0, 3)
      });
    } finally {
      setIsApiLoading(false);
    }
  };

  const handleOpenApiInspector = () => {
    setIsApiModalOpen(true);
    if (!apiData) {
      fetchMockApi();
    }
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center on Al-Madinah Al-Munawwarah [24.4672, 39.6111] with zoom 9
    const map = L.map(mapContainerRef.current, {
      center: [24.4672, 39.6111],
      zoom: 9,
      zoomControl: false,
      attributionControl: false
    });

    // Custom zoom control in bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Default CartoDB Dark Matter tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
      subdomains: 'abcd',
    }).addTo(map);

    const markersGroup = L.layerGroup().addTo(map);
    const circlesGroup = L.layerGroup().addTo(map);

    markersLayerRef.current = markersGroup;
    circlesLayerRef.current = circlesGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Tile Layer if mapType changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    if (mapType === 'dark') {
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 18,
        subdomains: 'abcd',
      }).addTo(map);
    } else {
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18,
      }).addTo(map);
    }
  }, [mapType]);

  // Render Markers and Buffers whenever filter or buffer toggle changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    const circlesGroup = circlesLayerRef.current;

    if (!map || !markersGroup || !circlesGroup) return;

    markersGroup.clearLayers();
    circlesGroup.clearLayers();

    const filteredSites = SUSPICIOUS_SITES_MOCK.filter((site) => {
      if (filterLevel === 'all') return true;
      return site.alert_level === filterLevel;
    });

    filteredSites.forEach((site) => {
      const isRed = site.alert_level === 'red';
      const colorHex = isRed ? '#ef4444' : '#eab308';
      const glowColor = isRed ? 'rgba(239, 68, 68, 0.5)' : 'rgba(234, 179, 8, 0.5)';

      // 1. Add Haversine Cluster Radius Circle (<1.1 km)
      if (showBuffers) {
        const radiusMeters = site.cluster_radius_km * 1000;
        const circle = L.circle(site.coordinates, {
          radius: radiusMeters,
          color: colorHex,
          weight: 1.5,
          opacity: 0.8,
          fillColor: colorHex,
          fillOpacity: 0.12,
          dashArray: '4, 4'
        });
        circle.addTo(circlesGroup);
      }

      // 2. Custom pulsing HTML icon
      const customIcon = L.divIcon({
        className: 'custom-satellite-pin',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -20],
        html: `
          <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
            <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background: ${colorHex}; opacity: 0.4; animation: radar-pulse 2s infinite ease-out;"></div>
            <div style="position: relative; width: 22px; height: 22px; border-radius: 50%; background: #080c14; border: 2.5px solid ${colorHex}; box-shadow: 0 0 12px ${glowColor}; display: flex; align-items: center; justify-content: center;">
              <div style="width: 8px; height: 8px; border-radius: 50%; background: ${colorHex};"></div>
            </div>
          </div>
        `
      });

      const marker = L.marker(site.coordinates, { icon: customIcon });

      // Leaflet Popup content with Phase 2 badges
      const popupHtml = `
        <div style="direction: rtl; text-align: right; font-family: 'Tajawal', sans-serif; min-width: 230px; padding: 4px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; border-bottom: 1px solid rgba(212,175,55,0.3); padding-bottom: 4px;">
            <span style="font-weight: 800; font-size: 13px; color: ${colorHex};">${site.id}</span>
            <span style="font-size: 10px; background: rgba(0,0,0,0.4); padding: 2px 6px; border-radius: 4px; border: 1px solid ${colorHex}; color: ${colorHex}; font-weight: bold;">
              ${isRed ? 'إنذار أحمر مؤكد (Score > 90%)' : 'إنذار أصفر قيد المراقبة'}
            </span>
          </div>
          <div style="font-size: 13px; font-weight: 700; color: #ffffff; margin-bottom: 4px;">${site.name}</div>
          <div style="font-size: 11px; color: #94a3b8; margin-bottom: 6px;">${site.classification}</div>
          <div style="background: rgba(0,0,0,0.3); padding: 6px; border-radius: 6px; font-size: 11px; color: #cbd5e1; line-height: 1.6;">
            <div>حراري Landsat-9: <strong style="color: #fbbf24;">${site.landsat_tirs_temp_k} K (100م)</strong></div>
            <div>رادار InSAR Coherence: <strong style="color: ${site.s1_coherence_drop_percent > 40 ? '#f87171' : '#fbbf24'};">-${site.s1_coherence_drop_percent}% (${site.s1_coherence_drop_percent > 40 ? 'حفر مؤكد' : 'مستقر'})</strong></div>
            <div>شذوذ نباتي NDVI: <strong style="color: #34d399;">+${site.ndvi_delta}</strong></div>
            <div>معادلة الدمج الجنائي: <strong style="color: #38bdf8;">${site.fusion_details.final_score}%</strong></div>
          </div>
          <div style="margin-top: 6px; text-align: center;">
            <span style="font-size: 10px; color: #d4af37; text-decoration: underline; cursor: pointer; font-weight: bold;">
              اضغط لعرض التدقيق الجنائي عالي الدقة (مرحلة 2)
            </span>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        setSelectedSite(site);
      });

      marker.addTo(markersGroup);
    });
  }, [filterLevel, showBuffers]);

  const recenterMap = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([24.4672, 39.6111], 9, { animate: true });
    }
  };

  const focusSite = (site: SuspiciousSite) => {
    setSelectedSite(site);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(site.coordinates, 12, { animate: true });
    }
  };

  const handleSimulateDispatch = () => {
    setDispatchAlertSuccess(true);
    setTimeout(() => setDispatchAlertSuccess(false), 4000);
  };

  return (
    <section id="map-section" className="py-20 bg-[#060910] relative border-t border-[#d4af37]/25">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-amber-300 text-xs font-bold mb-3">
              <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>القسم الثالث: المنصة الاستخبارية والخريطة التفاعلية (المرحلة 2)</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              غرفة عمليات الاستشعار الفضائي - <span className="gold-gradient-text">المدينة المنورة</span>
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl">
              مركز الرصد [24.4672, 39.6111] زوم 9. نظام التأكيد الجنائي متعدد الأقمار: حراري Landsat 100م + رادار Sentinel-1 InSAR Coherence لكشف أعمال الحفر والتمويه.
            </p>
          </div>

          {/* Quick Mock API Trigger & Basemap controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleOpenApiInspector}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 border border-[#d4af37]/50 text-amber-300 font-bold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all"
            >
              <Terminal className="w-4 h-4 text-amber-400" />
              <span>فحص واجهة /api/suspicious/madinah</span>
            </button>

            <button
              onClick={recenterMap}
              className="px-3 py-2 rounded-xl bg-[#0e1422] hover:bg-[#152037] border border-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="إعادة ضبط الرؤية لمركز المدينة المنورة"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة التمركز</span>
            </button>
          </div>
        </div>

        {/* Filters and Layer Toggles Strip (Includes the newly requested "تأكيد عالي الدقة 3م" button) */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-[#0a0f1c] border border-slate-800 mb-6">
          
          {/* Level Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium ml-1">تصفية التهديد:</span>
            <button
              onClick={() => setFilterLevel('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterLevel === 'all'
                  ? 'bg-gradient-to-r from-[#d4af37] to-amber-600 text-slate-950 font-black shadow-md'
                  : 'bg-[#121929] text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              جميع الأهداف (5)
            </button>
            <button
              onClick={() => setFilterLevel('red')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterLevel === 'red'
                  ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.5)]'
                  : 'bg-[#121929] text-red-400 hover:bg-red-950/40 border border-red-900/50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
              <span>إنذار أحمر مؤكد (Score &gt; 90%)</span>
            </button>
            <button
              onClick={() => setFilterLevel('yellow')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterLevel === 'yellow'
                  ? 'bg-amber-500 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                  : 'bg-[#121929] text-amber-300 hover:bg-amber-950/40 border border-amber-900/50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>إنذار أصفر قيد المراقبة</span>
            </button>
          </div>

          {/* Map view options & User Requested Button */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 hidden sm:flex">
              <input
                type="checkbox"
                checked={showBuffers}
                onChange={(e) => setShowBuffers(e.target.checked)}
                className="accent-[#d4af37] rounded"
              />
              <span>نطاق دمج هافرسين (&lt;1.1 كم)</span>
            </label>

            <div className="h-4 w-px bg-slate-800 hidden sm:block" />

            <div className="flex items-center gap-1 bg-[#060910] p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setMapType('dark')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  mapType === 'dark' ? 'bg-[#d4af37] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                خريطة داكنة
              </button>
              <button
                onClick={() => setMapType('satellite')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  mapType === 'satellite' ? 'bg-[#d4af37] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                صور الأقمار
              </button>
              
              {/* NEW REQUESTED BUTTON: تأكيد عالي الدقة 3م */}
              <button
                onClick={() => setIsForensicModalOpen(true)}
                className="px-3 py-1 rounded font-bold text-xs bg-gradient-to-r from-red-600 via-amber-600 to-[#d4af37] hover:from-red-500 hover:to-amber-300 text-white transition-all shadow-[0_0_15px_rgba(212,175,55,0.45)] flex items-center gap-1.5 cursor-pointer ml-1"
                title="فتح نافذة التأكيد الجنائي عالي الدقة: Sentinel-2 10م + Landsat 100م + Sentinel-1 InSAR Coherence"
              >
                <Radar className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
                <span>تأكيد عالي الدقة 3م</span>
              </button>
            </div>
          </div>

        </div>

        {/* Map & Target Dossier Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Leaflet Map Viewport */}
          <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-[#d4af37]/40 shadow-2xl bg-[#090d16] flex flex-col relative min-h-[580px]">
            
            {/* Top Telemetry Overlay Bar */}
            <div className="absolute top-3 left-3 right-3 z-[400] flex items-center justify-between pointer-events-none">
              <div className="bg-[#070b14]/90 backdrop-blur-md border border-[#d4af37]/40 px-3.5 py-1.5 rounded-xl shadow-lg pointer-events-auto flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-amber-200">
                  SAR COHERENCE + LANDSAT TIRS LAYER: ACTIVE
                </span>
              </div>

              <div className="bg-[#070b14]/90 backdrop-blur-md border border-slate-800 px-3.5 py-1.5 rounded-xl shadow-lg pointer-events-auto text-[11px] text-slate-300 font-medium hidden sm:flex items-center gap-2">
                <span>تحديث InSAR راداري:</span>
                <span className="font-mono text-emerald-400">12-Day Cycle Complete</span>
              </div>
            </div>

            {/* The Actual Leaflet Map Canvas */}
            <div 
              ref={mapContainerRef} 
              className="w-full h-full min-h-[580px] z-0"
            />

            {/* Bottom Quick-Target Selector Pills inside map */}
            <div className="p-3 bg-[#0a0f1d] border-t border-slate-800 flex items-center gap-2 overflow-x-auto">
              <span className="text-xs text-slate-400 shrink-0 font-medium">الأهداف المرصودة:</span>
              {SUSPICIOUS_SITES_MOCK.map((site) => (
                <button
                  key={site.id}
                  onClick={() => focusSite(site)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                    selectedSite?.id === site.id
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                      : site.alert_level === 'red'
                      ? 'bg-red-950/60 text-red-300 border border-red-800/60 hover:bg-red-900/40'
                      : 'bg-amber-950/60 text-amber-300 border border-amber-800/60 hover:bg-amber-900/40'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${site.alert_level === 'red' ? 'bg-red-400' : 'bg-amber-400'}`} />
                  <span>{site.id} ({site.fusion_details.final_score}%)</span>
                </button>
              ))}
            </div>

          </div>

          {/* Right Side: Detailed Intelligence Dossier / Panel */}
          <div className="lg:col-span-4 rounded-2xl bg-[#0a0f1c] border border-[#d4af37]/40 p-6 shadow-2xl flex flex-col justify-between">
            {selectedSite ? (
              <div className="space-y-4">
                
                {/* Header of Dossier */}
                <div className="pb-3 border-b border-slate-800">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono font-bold text-sm text-amber-400">
                      {selectedSite.id}
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      selectedSite.alert_level === 'red'
                        ? 'bg-red-950 text-red-300 border-red-700'
                        : 'bg-amber-950 text-amber-300 border-amber-700'
                    }`}>
                      {selectedSite.alert_label}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {selectedSite.name}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono block mt-0.5">
                    {selectedSite.name_en}
                  </span>
                </div>

                {/* Threat Score Metric Card with Phase 2 Formula Integration */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#121929] to-[#0c1322] border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">نتيجة الدمج الجنائي (Fusion Score)</span>
                    <span className="text-[11px] font-mono text-amber-400 font-semibold mt-0.5 block">
                      Formula: 0.3*VIIRS + 0.3*Landsat + 0.25*S1 + 0.15*S2
                    </span>
                  </div>
                  <div className="text-left font-mono">
                    <span className={`text-3xl font-black ${selectedSite.fusion_details.final_score >= 90 ? 'text-red-400' : 'text-amber-400'}`}>
                      {selectedSite.fusion_details.final_score}%
                    </span>
                    <span className="text-[10px] block text-slate-400">
                      {selectedSite.fusion_details.final_score >= 90 ? 'إنذار أحمر مؤكد' : 'إنذار أصفر مراقب'}
                    </span>
                  </div>
                </div>

                {/* Phase 2: Action Button to Open High-Accuracy Forensic Modal */}
                <button
                  onClick={() => setIsForensicModalOpen(true)}
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-600/30 via-[#d4af37]/20 to-amber-600/30 hover:from-amber-600/40 hover:to-[#d4af37]/30 border border-[#d4af37]/60 text-amber-200 font-bold text-xs flex items-center justify-between shadow-lg transition-all group cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Radar className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
                    <span>التأكيد الجنائي عالي الدقة (مرحلة 2)</span>
                  </span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-black/60 border border-amber-400/50 text-amber-300">
                    عرض الصور الثلاث والرسم
                  </span>
                </button>

                {/* 4 Sensor Specs Matrix (Phase 2 Enhanced) */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-2.5 rounded-lg bg-[#0e1628] border border-slate-800">
                    <span className="text-[11px] text-slate-400 block mb-0.5 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      حراري Landsat TIRS:
                    </span>
                    <span className="text-sm font-mono font-bold text-amber-300">
                      {selectedSite.landsat_tirs_temp_k} K (100م)
                    </span>
                    <span className="text-[10px] text-emerald-400 block mt-0.5">
                      {selectedSite.thermal_engine_confirmed ? 'تأكيد محرك ديزل' : 'قيد التأكيد'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#0e1628] border border-slate-800">
                    <span className="text-[11px] text-slate-400 block mb-0.5 flex items-center gap-1">
                      <Radar className="w-3.5 h-3.5 text-red-400" />
                      هبوط InSAR راداري:
                    </span>
                    <span className={`text-sm font-mono font-bold ${selectedSite.s1_coherence_drop_percent > 40 ? 'text-red-400' : 'text-amber-300'}`}>
                      -{selectedSite.s1_coherence_drop_percent}%
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {selectedSite.s1_coherence_drop_percent > 40 ? 'حفر أرضي مؤكد (>40%)' : 'تغير محدود'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#0e1628] border border-slate-800">
                    <span className="text-[11px] text-slate-400 block mb-0.5 flex items-center gap-1">
                      <Trees className="w-3.5 h-3.5 text-emerald-400" />
                      طفرة نبات NDVI:
                    </span>
                    <span className="text-sm font-mono font-bold text-emerald-400">
                      +{selectedSite.ndvi_delta} Delta
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Sentinel-2 بدقة 10م
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#0e1628] border border-slate-800">
                    <span className="text-[11px] text-slate-400 block mb-0.5">
                      تكتل هافرسين:
                    </span>
                    <span className="text-sm font-mono font-bold text-white">
                      {selectedSite.cluster_radius_km} كم
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {selectedSite.consecutive_nights} ليالٍ متتالية
                    </span>
                  </div>
                </div>

                {/* Satellite Pass & Sensor Source */}
                <div className="p-3 rounded-lg bg-[#060910] border border-slate-800 text-xs space-y-1.5 font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>المستشعرات المدمجة:</span>
                    <span className="text-slate-200 font-bold truncate max-w-[200px]">{selectedSite.sensor_source}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>الإحداثيات الدقيقة:</span>
                    <span className="text-amber-400 font-bold">
                      {selectedSite.coordinates[0].toFixed(4)}°N, {selectedSite.coordinates[1].toFixed(4)}°E
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>آخر مرور للأقمار:</span>
                    <span className="text-slate-300">{selectedSite.last_pass}</span>
                  </div>
                </div>

                {/* Security Description */}
                <div className="p-3 rounded-lg bg-[#0e1628]/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-amber-300 block mb-1">التقرير التحليلي الجنائي:</strong>
                  {selectedSite.description}
                </div>

                {/* Dispatch Alert Banner */}
                {dispatchAlertSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
                    <CheckCircle className="w-5 h-5 shrink-0" />
                    <span>تم توجيه برقية استخبارية رقم #OP-{selectedSite.id} مع بيانات InSAR لغرفة العمليات المشتركة بنجاح.</span>
                  </div>
                )}

              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-slate-400 text-center">
                <MapPin className="w-8 h-8 text-amber-400 mb-2" />
                <p className="text-sm">اضغط على أي نقطة على الخريطة لعرض ملف التأكيد الجنائي</p>
              </div>
            )}

            {/* Dossier Action Buttons */}
            {selectedSite && (
              <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
                <button
                  onClick={handleSimulateDispatch}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-amber-500 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.35)] transition-all cursor-pointer"
                >
                  <ShieldAlert className="w-4 h-4 text-slate-950" />
                  <span>إرسال إحالة أمنية عاجلة (مؤكدة بنسبة {selectedSite.fusion_details.final_score}%)</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsForensicModalOpen(true)}
                    className="flex-1 py-2 px-3 rounded-lg bg-[#0e1628] hover:bg-[#16233d] border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Radar className="w-3.5 h-3.5 text-amber-400" />
                    <span>فحص الأدلة الثلاثة</span>
                  </button>

                  <button
                    onClick={() => {
                      window.open(`https://www.google.com/maps/search/?api=1&query=${selectedSite.coordinates[0]},${selectedSite.coordinates[1]}`, '_blank');
                    }}
                    className="flex-1 py-2 px-3 rounded-lg bg-[#0e1628] hover:bg-[#16233d] border border-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5 text-blue-400" />
                    <span>موقع الإحداثي</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Forensic High-Accuracy Modal (Phase 2) */}
      {selectedSite && (
        <ForensicModal
          isOpen={isForensicModalOpen}
          onClose={() => setIsForensicModalOpen(false)}
          site={selectedSite}
          allSites={SUSPICIOUS_SITES_MOCK}
          onSelectSite={(s) => setSelectedSite(s)}
        />
      )}

      {/* API Inspector Modal */}
      <ApiInspectorModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
        apiData={apiData}
        isLoading={isApiLoading}
        onRefresh={fetchMockApi}
      />

    </section>
  );
};
