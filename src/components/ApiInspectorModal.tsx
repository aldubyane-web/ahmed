import React, { useState } from 'react';
import { X, Check, Copy, Terminal, ExternalLink, RefreshCw } from 'lucide-react';

interface ApiInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiData: any;
  isLoading: boolean;
  onRefresh: () => void;
}

export const ApiInspectorModal: React.FC<ApiInspectorModalProps> = ({
  isOpen,
  onClose,
  apiData,
  isLoading,
  onRefresh
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const jsonString = JSON.stringify(apiData, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl rounded-2xl bg-[#090d16] border border-[#d4af37]/50 shadow-[0_0_50px_rgba(212,175,55,0.25)] flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0d1322]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white">واجهة برمجة التطبيقات الأمنية (REST API)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
                  HTTP 200 OK
                </span>
              </div>
              <span className="text-xs font-mono text-amber-300">GET /api/suspicious/madinah</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Strip */}
        <div className="px-6 py-2.5 bg-[#05070c] border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span>المخرجات: <strong className="text-slate-200">3 مواقع مشبوهة مؤكدة</strong></span>
            <span>التنسيق: <strong className="font-mono text-amber-300">application/json</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#0e1628] hover:bg-[#15223e] text-slate-300 hover:text-white border border-slate-700 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>إعادة الاستدعاء</span>
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#d4af37]/20 hover:bg-[#d4af37]/30 text-amber-300 border border-[#d4af37]/40 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'تم النسخ!' : 'نسخ JSON'}</span>
            </button>
          </div>
        </div>

        {/* JSON Code Viewer */}
        <div className="p-6 overflow-y-auto font-mono text-xs text-emerald-300 bg-[#05070a] dir-ltr text-left">
          {isLoading ? (
            <div className="flex items-center justify-center py-16 text-slate-400 gap-2">
              <RefreshCw className="w-5 h-5 animate-spin text-amber-400" />
              <span>جاري استدعاء السيرفر وتحليل بيانات الأقمار...</span>
            </div>
          ) : (
            <pre className="whitespace-pre-wrap leading-relaxed">{jsonString}</pre>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#0a0f1c] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>نظام التكامل: منصة حِصْن - المركز الوطني للعمليات المشتركة</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
