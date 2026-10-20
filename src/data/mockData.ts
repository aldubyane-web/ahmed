export interface CoherenceHistoryPoint {
  day: number;
  date: string;
  coherence: number; // 0.0 to 1.0
  threshold: number; // baseline
  pass_orbit: string;
  is_drop_event?: boolean;
}

export interface FusionScoreDetails {
  viirs_anomaly: number; // e.g. 96
  landsat_tirs_confirm: number; // e.g. 98
  s1_coherence_drop: number; // e.g. 94
  s2_ndvi_anomaly: number; // e.g. 88
  final_score: number; // calculated via formula
  is_escalated_to_red: boolean;
}

export interface SuspiciousSite {
  id: string;
  name: string;
  name_en: string;
  coordinates: [number, number]; // [lat, lng]
  alert_level: 'red' | 'yellow';
  alert_label: string;
  threat_score: number;
  consecutive_nights: number;
  brightness_temperature_k: number;
  ndvi_delta: number;
  cluster_radius_km: number;
  sensor_source: string;
  first_detected: string;
  last_pass: string;
  classification: string;
  description: string;
  action_status: string;
  terrain_type: string;
  recommended_response: string;

  // Phase 2: High-Accuracy Forensic Confirmation Layer
  landsat_tirs_temp_k: number;
  ecostress_lst_k: number;
  s1_coherence_baseline: number;
  s1_coherence_current: number;
  s1_coherence_drop_percent: number;
  s1_coherence_history: CoherenceHistoryPoint[];
  fusion_details: FusionScoreDetails;
  optical_image_url: string;
  thermal_image_url: string;
  sar_coherence_image_url: string;
  surface_disturbance_confirmed: boolean;
  thermal_engine_confirmed: boolean;
}

// Generate realistic 30-day coherence history data showing baseline ~0.85 then steep drop >40% around day 18-20
const generateCoherenceHistory = (dropDay: number, dropRate: number): CoherenceHistoryPoint[] => {
  const points: CoherenceHistoryPoint[] = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dayIndex = 30 - i;
    const dateStr = d.toLocaleDateString('ar-SA', { month: 'numeric', day: 'numeric' });

    let val: number;
    let isDrop = false;

    if (dayIndex < dropDay) {
      // Normal stable rocky desert coherence (0.82 - 0.88)
      val = 0.84 + (Math.sin(dayIndex * 1.5) * 0.03);
    } else if (dayIndex === dropDay) {
      // Sudden drop indicating new clandestine excavation/shading
      val = 0.84 * (1 - (dropRate / 100));
      isDrop = true;
    } else {
      // Sustained disturbed soil & machinery state (0.38 - 0.46)
      val = 0.84 * (1 - (dropRate / 100)) + (Math.sin(dayIndex) * 0.02);
    }

    points.push({
      day: dayIndex,
      date: dateStr,
      coherence: Math.max(0.1, Number(val.toFixed(3))),
      threshold: 0.84,
      pass_orbit: `Sentinel-1 ${dayIndex % 2 === 0 ? 'Descending (Track 131)' : 'Ascending (Track 58)'}`,
      is_drop_event: isDrop
    });
  }
  return points;
};

// Calculate exact user formula:
// Final Score = (VIIRS_Anomaly * 0.3) + (Landsat_TIRS_Confirm * 0.3) + (S1_Coherence_Drop * 0.25) + (S2_NDVI_Anomaly * 0.15)
export const calculateFusionScore = (
  viirs: number,
  landsat: number,
  s1Drop: number,
  s2Ndvi: number
): FusionScoreDetails => {
  const score = (viirs * 0.3) + (landsat * 0.3) + (s1Drop * 0.25) + (s2Ndvi * 0.15);
  const rounded = Number(score.toFixed(1));
  return {
    viirs_anomaly: viirs,
    landsat_tirs_confirm: landsat,
    s1_coherence_drop: s1Drop,
    s2_ndvi_anomaly: s2Ndvi,
    final_score: rounded,
    is_escalated_to_red: rounded >= 90.0
  };
};

export const SUSPICIOUS_SITES_MOCK: SuspiciousSite[] = [
  {
    id: "HISN-MED-001",
    name: "وادي العقيق الغربي - النطاق الصحراوي المحمي",
    name_en: "Western Wadi Al-Aqiq Desert Margin",
    coordinates: [24.4120, 39.4890],
    alert_level: "red",
    alert_label: "إنذار أحمر - معمل متقدم ونشاط طيفي/راداري مؤكد",
    threat_score: 96.4,
    consecutive_nights: 4,
    brightness_temperature_k: 334.8,
    ndvi_delta: 0.41,
    cluster_radius_km: 0.72,
    sensor_source: "Multi-Sensor (VIIRS + Landsat 9 + S1 SAR + S2)",
    first_detected: "2026-10-16 02:40 AST",
    last_pass: "2026-10-19 03:15 AST",
    classification: "معمل تصنيع ومستودع تمويهي متخفي",
    description: "تأكيد جنائي حاسم: انبعاث حراري محرك ديزل مؤكد عبر Landsat TIRS (335.6K) مع هبوط راداري InSAR بنسبة 46.3% يؤكد حفر مخبأ أرضي جديد تحت شباك التمويه.",
    action_status: "إحالة أمنية عاجلة لغرفة العمليات المشتركة (تأكيد مرحلة 2)",
    terrain_type: "شعب صحراوي صخري ذو تضاريس متدرجة",
    recommended_response: "اعتراض تكتيكي مباشر وتطويق أمني محكم",

    // Phase 2 data
    landsat_tirs_temp_k: 335.6,
    ecostress_lst_k: 336.8,
    s1_coherence_baseline: 0.85,
    s1_coherence_current: 0.45,
    s1_coherence_drop_percent: 46.3, // > 40% threshold!
    s1_coherence_history: generateCoherenceHistory(19, 46.3),
    fusion_details: calculateFusionScore(97.0, 98.2, 95.0, 92.5),
    optical_image_url: "/src/assets/images/sentinel2_optical_madinah_1792484433589.jpg",
    thermal_image_url: "/src/assets/images/landsat_thermal_tirs_1792484434577.jpg",
    sar_coherence_image_url: "/src/assets/images/sentinel1_sar_coherence_1792484456725.jpg",
    surface_disturbance_confirmed: true,
    thermal_engine_confirmed: true
  },
  {
    id: "HISN-MED-002",
    name: "حرة خيبر الجنوبية - النطاق البركاني الوعر",
    name_en: "Southern Khaybar Volcanic Plateau",
    coordinates: [24.8912, 39.7340],
    alert_level: "red",
    alert_label: "إنذار أحمر - معمل متقدم ونشاط طيفي/راداري مؤكد",
    threat_score: 95.1,
    consecutive_nights: 5,
    brightness_temperature_k: 338.2,
    ndvi_delta: 0.12,
    cluster_radius_km: 0.85,
    sensor_source: "Landsat-9 TIRS (100m) + Sentinel-1 SAR Coherence",
    first_detected: "2026-10-15 01:20 AST",
    last_pass: "2026-10-19 02:50 AST",
    classification: "مستودع تهريب ونقطة لوجستية مخفية في تجاويف صخرية",
    description: "بصمة حرارية ليلية 338.2K ليست تسخيناً شمسياً للحرات البازلتية، بل تم التحقق منها بمستشعر Landsat Band 10 كمصدر احتراق داخلي، مدعومة بهبوط InSAR بنسبة 48.1% دلالة على استحداث مأوى صخري.",
    action_status: "قيد المراقبة الفضائية عالية الدقة وتنسيق التدخل",
    terrain_type: "حرات بركانية بازلتية وعرة ذات مسالك ضيقة",
    recommended_response: "رصد جوي مسير ليلي وتحديد محاور الدخول والخروج",

    // Phase 2 data
    landsat_tirs_temp_k: 337.9,
    ecostress_lst_k: 339.1,
    s1_coherence_baseline: 0.88,
    s1_coherence_current: 0.45,
    s1_coherence_drop_percent: 48.1,
    s1_coherence_history: generateCoherenceHistory(17, 48.1),
    fusion_details: calculateFusionScore(96.0, 97.5, 96.0, 84.0),
    optical_image_url: "/src/assets/images/sentinel2_optical_madinah_1792484433589.jpg",
    thermal_image_url: "/src/assets/images/landsat_thermal_tirs_1792484434577.jpg",
    sar_coherence_image_url: "/src/assets/images/sentinel1_sar_coherence_1792484456725.jpg",
    surface_disturbance_confirmed: true,
    thermal_engine_confirmed: true
  },
  {
    id: "HISN-MED-003",
    name: "الحناكية - أطراف وادي المحفر الشرقية",
    name_en: "Al-Hinakiyah - Al-Mahfar Border Range",
    coordinates: [24.5210, 40.1150],
    alert_level: "yellow",
    alert_label: "إنذار أصفر - قيد التحقق الراداري والحراري المتقدم",
    threat_score: 84.2,
    consecutive_nights: 3,
    brightness_temperature_k: 331.4,
    ndvi_delta: 0.38,
    cluster_radius_km: 0.94,
    sensor_source: "Sentinel-2 Multi-spectral + VIIRS + S1",
    first_detected: "2026-10-17 03:05 AST",
    last_pass: "2026-10-19 03:40 AST",
    classification: "استنبات زراعي غير مصرح ذو ري موضعي مخفي",
    description: "طفرة نباتية حادة NDVI Delta 0.38 مع تغير طفيف في Coherence (24.5% لم يتجاوز عتبة الـ 40%). السكور الحالي 84.2% ولم يتجاوز 90%، لذا يبقى في حالة الرصد الأصفر.",
    action_status: "استطلاع جوي مسيّر وطواقم ميدانية مجدولة",
    terrain_type: "منطقة كثبان رملية هلالية متداخلة مع مجاري سيول جافة",
    recommended_response: "تحقق مساحي عبر الطائرات بدون طيار وفحص السجل الزراعي",

    // Phase 2 data
    landsat_tirs_temp_k: 326.8,
    ecostress_lst_k: 327.4,
    s1_coherence_baseline: 0.81,
    s1_coherence_current: 0.61,
    s1_coherence_drop_percent: 24.5, // < 40%
    s1_coherence_history: generateCoherenceHistory(22, 24.5),
    fusion_details: calculateFusionScore(82.0, 80.0, 68.0, 95.0),
    optical_image_url: "/src/assets/images/sentinel2_optical_madinah_1792484433589.jpg",
    thermal_image_url: "/src/assets/images/landsat_thermal_tirs_1792484434577.jpg",
    sar_coherence_image_url: "/src/assets/images/sentinel1_sar_coherence_1792484456725.jpg",
    surface_disturbance_confirmed: false,
    thermal_engine_confirmed: false
  },
  {
    id: "HISN-MED-004",
    name: "ممر بدر - ينبع الشرقي (نطاق الإمداد)",
    name_en: "Badr - East Yanbu Logistics Corridor",
    coordinates: [24.1150, 38.9820],
    alert_level: "yellow",
    alert_label: "إنذار أصفر - حركة حرارية ليلية متقطعة",
    threat_score: 79.5,
    consecutive_nights: 3,
    brightness_temperature_k: 332.6,
    ndvi_delta: 0.22,
    cluster_radius_km: 1.05,
    sensor_source: "VIIRS 375m + Sentinel-1 GRD",
    first_detected: "2026-10-17 02:15 AST",
    last_pass: "2026-10-19 01:55 AST",
    classification: "نقطة تفريغ وتبديل مسارات ليلية",
    description: "شاحنات ومحركات متوقفة ليلاً. هبوط التماسك الراداري InSAR بلغ 28.0% فقط دون إثبات إنشاءات أرضية ثابتة، ويبقى مصنفاً كإنذار أصفر تحت المراقبة.",
    action_status: "مراقبة دوريات استطلاع ذكية ومسح مساري",
    terrain_type: "أودية جبلية ضيقة متصلة بالسهل الساحلي",
    recommended_response: "نصب كمائن إلكترونية ورادارات استشعار أرضي",

    // Phase 2 data
    landsat_tirs_temp_k: 328.2,
    ecostress_lst_k: 329.0,
    s1_coherence_baseline: 0.83,
    s1_coherence_current: 0.59,
    s1_coherence_drop_percent: 28.0,
    s1_coherence_history: generateCoherenceHistory(21, 28.0),
    fusion_details: calculateFusionScore(81.0, 78.0, 72.0, 65.0),
    optical_image_url: "/src/assets/images/sentinel2_optical_madinah_1792484433589.jpg",
    thermal_image_url: "/src/assets/images/landsat_thermal_tirs_1792484434577.jpg",
    sar_coherence_image_url: "/src/assets/images/sentinel1_sar_coherence_1792484456725.jpg",
    surface_disturbance_confirmed: false,
    thermal_engine_confirmed: false
  },
  {
    id: "HISN-MED-005",
    name: "شمال العلا - السهل الرملي المحاذي للحرار",
    name_en: "North Al-Ula Desert-Lava Boundary",
    coordinates: [25.1840, 39.3120],
    alert_level: "red",
    alert_label: "إنذار أحمر - معمل متقدم ونشاط طيفي/راداري مؤكد",
    threat_score: 95.1,
    consecutive_nights: 4,
    brightness_temperature_k: 336.1,
    ndvi_delta: 0.44,
    cluster_radius_km: 0.68,
    sensor_source: "Multi-Sensor (Landsat-9 100m + ECOSTRESS + S1 SAR + S2)",
    first_detected: "2026-10-16 01:45 AST",
    last_pass: "2026-10-19 02:30 AST",
    classification: "معمل تصنيع وتعبئة مواد مخدرة مجهز بوحدات تبريد",
    description: "حقق أعلى معايير التأكيد الجنائي: انبعاث حراري Landsat TIRS (336.5K) مع هبوط Coherence حاد بنسبة 49.8% يؤكد أعمال حفر خنادق ومستودعات محصنة، مما رفع السكور لـ 95.1% وتحويله لإنذار أحمر عاجل.",
    action_status: "جاهز للمداهمة والتنسيق مع قوة التدخل السريع",
    terrain_type: "هضاب رملية محاطة بواجهات جبلية صوانية حادة",
    recommended_response: "مداهمة مشتركة جوية وبرية وتأمين الممرات",

    // Phase 2 data
    landsat_tirs_temp_k: 336.5,
    ecostress_lst_k: 337.2,
    s1_coherence_baseline: 0.86,
    s1_coherence_current: 0.43,
    s1_coherence_drop_percent: 49.8,
    s1_coherence_history: generateCoherenceHistory(18, 49.8),
    fusion_details: calculateFusionScore(95.0, 96.0, 96.5, 93.0),
    optical_image_url: "/src/assets/images/sentinel2_optical_madinah_1792484433589.jpg",
    thermal_image_url: "/src/assets/images/landsat_thermal_tirs_1792484434577.jpg",
    sar_coherence_image_url: "/src/assets/images/sentinel1_sar_coherence_1792484456725.jpg",
    surface_disturbance_confirmed: true,
    thermal_engine_confirmed: true
  }
];

export const SYSTEM_METRICS = {
  accuracy_rate: 94.6,
  forensic_accuracy_rate: 98.2, // Phase 2 forensic confirmation
  detection_window_hours: 72,
  traditional_detection_days: 45,
  initial_alerts: 124,
  filtered_verified_targets: 18,
  false_alarm_reduction_percentage: 90.0, // Updated to 90% as requested by user
  update_cycle_hours: 6,
  coverage_area_sqkm: "151,990 كم²",
  satellites_integrated: 6, // Added Landsat-8/9 & Sentinel-1
  monitored_region: "منطقة المدينة المنورة والمحافظات التابعة",
  sar_coherence_threshold_percent: 40.0,
  thermal_spatial_resolution_meters: 100, // Landsat TIRS Band 10
  ecostress_resolution_meters: 70, // ECOSTRESS
  optical_resolution_meters: 10 // Sentinel-2
};

export const ALGORITHM_STEPS = [
  {
    step: 1,
    title: "1. المسح الواسع: سحب بيانات NASA FIRMS كل 6 ساعات",
    en: "Wide-Area Scanning (VIIRS 375m & MODIS 1km)",
    description: "المسح الاستطلاعي الأولي للغطاء الجغرافي لمنطقة المدينة المنورة بالكامل لرصد أي بؤر حرارية غير طبيعية واستخراج الإحداثيات التقريبية كل 6 ساعات.",
    tech: "NASA FIRMS API / VIIRS I4 / MODIS",
    highlight: "دقة 375م - 1 كم"
  },
  {
    step: 2,
    title: "2. التدقيق الحراري عالي الدقة: Landsat 8/9 TIRS و ECOSTRESS",
    en: "High-Resolution Thermal Confirmation (100m / 70m)",
    description: "استبدال الاعتماد الكلي على VIIRS بطبقة Landsat-9 (Band 10) بدقة 100م و ECOSTRESS بدقة 70م للتأكد القاطع من أن مصدر 336K هو محرك احتراق / مولد ديزل / معمل كيميائي وليس حرارة الصخور البازلتية السوداء المكتسبة من الشمس.",
    tech: "Landsat TIRS Band 10 / ECOSTRESS L2 LST",
    highlight: "دقة 70م - 100م حراري"
  },
  {
    step: 3,
    title: "3. الاستشعار الراداري الثاقب: Sentinel-1 InSAR Coherence",
    en: "SAR Coherence Change Detection (Cloud & Night Proof)",
    description: "تطبيق التداخل الراداري InSAR عبر Sentinel-1 ومقارنة التماسك الزمني خلال دورة 12 يوماً. إذا انخفض التماسك بنسبة > 40% في الإحداثي، فهذا إثبات قاطع لأعمال حفر أرضية أو إقامة هياكل مموهة ومخابئ لا تكذبها الرادارات ولا تحجبها السحب أو الليل.",
    tech: "Google Earth Engine SAR / Sentinel-1 GRD",
    highlight: "هبوط التماسك > 40%"
  },
  {
    step: 4,
    title: "4. معادلة الدمج الجنائي الذكي وتصعيد الإنذار",
    en: "Multi-Sensor Forensic Fusion Formula",
    description: "Final Score = (VIIRS_Anomaly × 0.3) + (Landsat_TIRS × 0.3) + (S1_Coherence_Drop × 0.25) + (S2_NDVI × 0.15). عند تجاوز السكور 90%، يتم تصعيد الهدف فوراً من أصفر إلى إنذار أحمر مؤكد جنائياً بنسبة ثقة تتجاوز 95%.",
    tech: "Weighted Fusion / Automated Alert Escalation",
    highlight: "Final Score > 90% → إنذار أحمر"
  }
];

export const VISION_2030_PILLARS = [
  {
    title: "مجتمع آمن ومحصّن",
    subtitle: "حماية شباب الوطن واستقرار الأسر",
    text: "حماية المجتمع من أخطار المخدرات عبر شل قدرات شبكات التهريب والإنتاج السري قبل وصول السموم للمدن، تماشياً مع مستهدفات جودة الحياة والأمن المجتمعي.",
    icon: "ShieldCheck"
  },
  {
    title: "السيادة التقنية واستشعار الفضاء",
    subtitle: "توظيف الذكاء الاصطناعي والرادار الفضائي",
    text: "بناء حلول برمجية وطنية متقدمة تدمج تقنيات الرادار SAR والاستشعار الحراري عالي الدقة لتمكين الأجهزة الأمنية بأدوات سيادية رائدة تسبق التهديدات.",
    icon: "Satellite"
  },
  {
    title: "تقليص البلاغات الكاذبة بنسبة 90%",
    subtitle: "كفاءة الموارد والعمليات الأمنية الميدانية",
    text: "توفير آلاف ساعات الطيران المروحي والدوريات عبر الانتقال من المسح الواسع (1 كم) إلى التأكيد الجنائي (10م راداري و 10م بصري و 70م حراري) مما يحسم الشبهات بنسبة 100%.",
    icon: "Target"
  },
  {
    title: "الريادة الإقليمية للمدينة المنورة",
    subtitle: "نموذج المدن الذكية الآمنة",
    text: "تحويل منطقة المدينة المنورة إلى أيقونة وطنية في تطبيق حلول الرصد الفضائي الاستباقي لمكافحة الجريمة المنظمة وحفظ أمن أرض الحرمين الشريفين.",
    icon: "Award"
  }
];
