import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: '/ahmed/',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'mock-madinah-api',
        configureServer(server) {
          const apiHandler = (_req: any, res: any) => {
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.setHeader('Access-Control-Allow-Origin', '*');
            const data = {
              status: "success",
              region: "المدينة المنورة",
              target_boundary: "Al-Madinah Al-Munawwarah Metropolitan & Rural Fringe",
              timestamp: new Date().toISOString(),
              algorithm_version: "HISN-FORENSIC-v2.0 (Phase 2)",
              satellites: [
                "NASA FIRMS (VIIRS 375m & MODIS 1km)",
                "Landsat 8/9 Collection 2 Level 2 (TIRS Band 10 100m)",
                "NASA ECOSTRESS L2 LST (70m)",
                "Copernicus Sentinel-1 GRD InSAR Coherence (Radar SAR)",
                "Copernicus Sentinel-2 MSI (10m Optical / NDVI)"
              ],
              fusion_formula: "Final Score = (VIIRS_Anomaly * 0.3) + (Landsat_TIRS_Confirm * 0.3) + (S1_Coherence_Drop * 0.25) + (S2_NDVI_Anomaly * 0.15)",
              escalation_threshold: "Score > 90% triggers RED Alert Escalation",
              total_detected: 3,
              sites: [
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
                  landsat_tirs_temp_k: 335.6,
                  ecostress_lst_k: 336.8,
                  s1_coherence_drop_percent: 46.3,
                  s1_coherence_status: "انخفاض راداري حاد 46.3% (> 40%) - تأكيد حفر وتمويه أرضي",
                  thermal_engine_confirmed: true,
                  surface_disturbance_confirmed: true,
                  sensor_source: "Multi-Sensor (VIIRS + Landsat 9 TIRS + S1 InSAR + S2)",
                  first_detected: "2026-10-16 02:40 AST",
                  last_pass: "2026-10-19 03:15 AST",
                  classification: "معمل تصنيع ومستودع تمويهي متخفي",
                  description: "تأكيد جنائي حاسم: انبعاث حراري محرك ديزل مؤكد عبر Landsat TIRS (335.6K) مع هبوط راداري InSAR بنسبة 46.3% يؤكد حفر مخبأ أرضي جديد تحت شباك التمويه.",
                  action_status: "إحالة أمنية عاجلة لغرفة العمليات المشتركة (تأكيد مرحلة 2)"
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
                  landsat_tirs_temp_k: 337.9,
                  ecostress_lst_k: 339.1,
                  s1_coherence_drop_percent: 48.1,
                  s1_coherence_status: "انخفاض راداري 48.1% - استحداث تجاويف صخرية معزولة",
                  thermal_engine_confirmed: true,
                  surface_disturbance_confirmed: true,
                  sensor_source: "Landsat-9 TIRS (100m) + Sentinel-1 SAR Coherence",
                  first_detected: "2026-10-15 01:20 AST",
                  last_pass: "2026-10-19 02:50 AST",
                  classification: "مستودع تهريب ونقطة لوجستية مخفية في تجاويف صخرية",
                  description: "بصمة حرارية ليلية 338.2K تم التحقق منها بمستشعر Landsat Band 10 كمصدر احتراق داخلي وليس صخور بازلت، مدعومة بهبوط InSAR بنسبة 48.1%.",
                  action_status: "قيد المراقبة الفضائية عالية الدقة وتنسيق التدخل"
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
                  landsat_tirs_temp_k: 326.8,
                  ecostress_lst_k: 327.4,
                  s1_coherence_drop_percent: 24.5,
                  s1_coherence_status: "هبوط تماسك 24.5% لم يتجاوز عتبة الـ 40% - رصد دون مداهمة",
                  thermal_engine_confirmed: false,
                  surface_disturbance_confirmed: false,
                  sensor_source: "Sentinel-2 Multi-spectral + VIIRS + S1",
                  first_detected: "2026-10-17 03:05 AST",
                  last_pass: "2026-10-19 03:40 AST",
                  classification: "استنبات زراعي غير مصرح ذو ري موضعي مخفي",
                  description: "طفرة نباتية حادة NDVI Delta 0.38 مع هبوط Coherence طفيف 24.5%. السكور الحالي 84.2% ولم يتجاوز 90%، لذا يبقى في حالة الرصد الأصفر تجنباً للبلاغ الكاذب.",
                  action_status: "استطلاع جوي مسيّر وطواقم ميدانية مجدولة"
                }
              ]
            };
            res.end(JSON.stringify(data, null, 2));
          };

          // Serve both with base and without base
          server.middlewares.use('/api/suspicious/madinah', apiHandler);
          server.middlewares.use('/ahmed/api/suspicious/madinah', apiHandler);

          // Root redirect handler so accessing / in AI Studio dev environment automatically redirects to /ahmed/
          server.middlewares.use((req: any, res: any, next: any) => {
            if (req.url === '/' || req.url === '') {
              res.writeHead(302, { Location: '/ahmed/' });
              res.end();
              return;
            }
            next();
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname || process.cwd(), '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
