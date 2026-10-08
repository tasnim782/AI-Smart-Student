import React, { useState } from 'react';
import { Award, CheckCircle2, Download, Printer, X, Sparkles, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/sound';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  totalScore: number;
  userName: string;
  onUpdateUserName: (name: string) => void;
  rankTitle: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  score,
  totalScore,
  userName,
  onUpdateUserName,
  rankTitle
}) => {
  const [inputName, setInputName] = useState(userName || '');

  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      onUpdateUserName(inputName.trim());
      sound.playSuccess();
    }
  };

  const todayStr = new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date());

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 animate-fadeIn">
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors print:hidden cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Name input row if not set */}
        <div className="mb-6 print:hidden">
          <form onSubmit={handleSaveName} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="พิมพ์ชื่อ-นามสกุลของคุณเพื่อแสดงบนประกาศนียบัตร..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer shrink-0"
            >
              บันทึกชื่อ
            </button>
          </form>
        </div>

        {/* Certificate Card Printable Area */}
        <div className="border-4 border-double border-blue-900/30 rounded-2xl p-6 sm:p-10 bg-gradient-to-b from-blue-50/40 via-white to-slate-50 relative overflow-hidden text-center">
          {/* Subtle Background Watermark Shield */}
          <div className="absolute -top-10 -right-10 text-blue-900/5 pointer-events-none">
            <ShieldCheck className="w-56 h-56" />
          </div>

          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-md">
              <Award className="w-8 h-8" />
            </div>
          </div>

          <div className="text-xs uppercase font-bold tracking-widest text-blue-700 mb-1">
            Certificate of Digital AI Literacy
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
            เกียรติบัตรรับรองความรอบรู้ด้านปัญญาประดิษฐ์
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            AI Smart Student : เรียนรู้ AI ใช้อย่างฉลาดและรับผิดชอบ
          </p>

          <p className="text-xs text-slate-500 mb-1">ขอมอบเกียรติบัตรฉบับนี้เพื่อแสดงว่า</p>
          <div className="text-xl sm:text-2xl font-bold text-blue-950 pb-2 mb-4 border-b-2 border-blue-300 inline-block min-w-[240px]">
            {userName || inputName || 'นักเรียน / นักศึกษาผู้ใฝ่รู้'}
          </div>

          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
            ได้ผ่านการอบรมบทเรียนและทดสอบสถานการณ์จำลอง AI Challenge ครบถ้วน
            ตระหนักรู้ถึงประโยชน์ ข้อจำกัด ความเป็นส่วนตัว ลิขสิทธิ์ และจริยธรรมในการใช้ปัญญาประดิษฐ์
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-6">
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[11px] text-slate-500 block">ระดับความเข้าใจ</span>
              <span className="font-bold text-sm text-blue-700">{rankTitle}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[11px] text-slate-500 block">คะแนน AI Challenge</span>
              <span className="font-bold text-sm text-emerald-600">{score} / {totalScore} คะแนน</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-xs text-slate-500">
            <div>
              <span>วันที่ออกเกียรติบัตร: </span>
              <span className="font-semibold text-slate-700">{todayStr}</span>
            </div>
            <div className="flex items-center gap-1 text-blue-700 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>AI Smart Student Certified</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>พิมพ์หรือบันทึกเป็น PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
