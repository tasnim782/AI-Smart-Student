import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { sound } from '../utils/sound';

export const ScenarioChecker: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const options = [
    {
      id: 'A',
      label: 'A. เชื่อข้อมูลทันที',
      desc: 'เพราะ AI มีฐานข้อมูลมหาศาล และเป็นเทคโนโลยีระดับโลก น่าจะเชื่อถือได้ 100%',
      isCorrect: false,
      feedback: 'ยังไม่ถูกต้อง! AI มักสร้างข้อมูลเท็จที่ดูน่าเชื่อถือ (AI Hallucination) โดยไม่มีความรู้สึกผิด การเชื่อข้อมูลทันทีอาจนำไปสู่ข้อผิดพลาดร้ายแรง'
    },
    {
      id: 'B',
      label: 'B. นำข้อมูลไปส่งอาจารย์ทันที',
      desc: 'รีบส่งให้ทันกำหนด หากข้อมูลผิดค่อยบอกว่า "เป็นความผิดของ AI ที่ตอบมาแบบนี้"',
      isCorrect: false,
      feedback: 'ไม่ถูกต้อง! ในฐานะนักเรียน/นักศึกษา คุณคือผู้รับผิดชอบผลงานที่ส่งทุกชิ้น อาจารย์ประเมินความสามารถของคุณ ไม่สามารถอ้าง AI เพื่อปัดความรับผิดชอบได้'
    },
    {
      id: 'C',
      label: 'C. ตรวจสอบข้อมูลและแหล่งอ้างอิงก่อนนำไปใช้',
      desc: 'ใช้เครื่องมือค้นหา ค้นตำรา หรือสืบค้นแหล่งข้อมูลปฐมภูมิเพื่อยืนยันข้อเท็จจริง',
      isCorrect: true,
      feedback: 'ถูกต้องยอดเยี่ยม! 🎉 นี่คือหัวใจสำคัญของทักษะการรู้เท่าทัน AI (AI Literacy) เราต้องใช้ AI เป็นจุดเริ่มต้นในการตั้งคำถาม และทำหน้าที่เป็นผู้ตรวจสอบข้อเท็จจริง (Fact-Checker) เสมอ'
    },
    {
      id: 'D',
      label: 'D. ให้ AI ยืนยันว่าคำตอบของตัวเองถูกต้อง',
      desc: 'พิมพ์ถามซ้ำว่า "คุณแน่ใจนะว่าข้อมูลนี้ถูกต้องจริง ๆ ไม่ได้โกหก?"',
      isCorrect: false,
      feedback: 'ยังไม่ถูกต้อง! AI ไม่รู้ว่าตัวเองกำลังพูดเรื่องจริงหรือเท็จ โมเดลเพียงแค่ทำนายคำถัดไป หากถูกถามย้ำ โมเดลมักจะตอบยืนยันว่าถูกต้องด้วยความมั่นใจเท่าเดิม การถามซ้ำจึงไม่ใช่การตรวจสอบที่แท้จริง'
    }
  ];

  const handleSelect = (id: string) => {
    if (isSubmitted) return;
    sound.playClick();
    setSelectedOption(id);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsSubmitted(true);
    const chosen = options.find((o) => o.id === selectedOption);
    if (chosen?.isCorrect) {
      sound.playSuccess();
    } else {
      sound.playError();
    }
  };

  const handleReset = () => {
    sound.playClick();
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  const selectedOptObj = options.find((o) => o.id === selectedOption);

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 my-6">
      <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
        <HelpCircle className="w-4 h-4" />
        <span>สถานการณ์จำลองการรู้เท่าทัน AI</span>
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
        “AI ให้ข้อมูลที่ดูน่าเชื่อถือมาก พร้อมยกตัวเลขสถิติ แต่เราไม่แน่ใจว่าข้อมูลนั้นถูกต้องหรือไม่ เราควรทำอย่างไร?”
      </h3>
      <p className="text-slate-300 text-xs sm:text-sm mb-6">
        ลองเลือกคำตอบที่สะท้อนถึงการเป็นนักเรียน/นักศึกษาที่รู้เท่าทันเทคโนโลยี:
      </p>

      <div className="space-y-3 mb-6">
        {options.map((option) => {
          const isSelected = selectedOption === option.id;
          let containerStyle = 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 text-slate-200';

          if (isSubmitted) {
            if (option.isCorrect) {
              containerStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-100 ring-1 ring-emerald-500';
            } else if (isSelected && !option.isCorrect) {
              containerStyle = 'bg-rose-950/70 border-rose-500 text-rose-100 ring-1 ring-rose-500';
            } else {
              containerStyle = 'bg-slate-800/40 border-slate-800 text-slate-400 opacity-60';
            }
          } else if (isSelected) {
            containerStyle = 'bg-blue-900/60 border-blue-400 text-white ring-2 ring-blue-500/50';
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={isSubmitted}
              className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${containerStyle}`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 ${
                  isSubmitted && option.isCorrect
                    ? 'bg-emerald-500 text-white'
                    : isSubmitted && isSelected && !option.isCorrect
                    ? 'bg-rose-500 text-white'
                    : isSelected
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                {option.id}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm">{option.label}</div>
                <div className="text-xs text-slate-300/80 mt-0.5">{option.desc}</div>
              </div>
            </button>
          );
        })}
      </div>

      {!isSubmitted ? (
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all ${
              selectedOption
                ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 cursor-pointer shadow-lg shadow-cyan-500/20'
                : 'bg-slate-700 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>ยืนยันคำตอบ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          className={`p-4 rounded-xl border animate-fadeIn ${
            selectedOptObj?.isCorrect
              ? 'bg-emerald-950/60 border-emerald-500/80'
              : 'bg-rose-950/60 border-rose-500/80'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 font-bold text-sm">
              {selectedOptObj?.isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-300">ตอบถูกต้อง!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-400" />
                  <span className="text-rose-300">ยังไม่ถูกต้อง</span>
                </>
              )}
            </div>
            <button
              onClick={handleReset}
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1 font-medium bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700"
            >
              <RotateCcw className="w-3 h-3" />
              ลองตอบใหม่
            </button>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {selectedOptObj?.feedback}
          </p>
        </div>
      )}
    </div>
  );
};
