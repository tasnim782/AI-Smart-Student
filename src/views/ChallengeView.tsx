import React, { useState } from 'react';
import { ChallengeScenario } from '../types';
import {
  Award,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Home,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  FileCheck
} from 'lucide-react';
import { sound } from '../utils/sound';

interface ChallengeViewProps {
  scenarios: ChallengeScenario[];
  onFinishChallenge: (score: number, answers: Record<number, number>) => void;
  savedScore?: number;
  savedAnswers?: Record<number, number>;
  onNavigateHome: () => void;
  onOpenCertificate: () => void;
  userName: string;
}

export const ChallengeView: React.FC<ChallengeViewProps> = ({
  scenarios,
  onFinishChallenge,
  savedScore,
  savedAnswers,
  onNavigateHome,
  onOpenCertificate,
  userName
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmittedCurrent, setIsSubmittedCurrent] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Record<number, number>>(savedAnswers || {});
  const [isFinished, setIsFinished] = useState<boolean>(savedScore !== undefined && savedScore > 0);

  const scenario = scenarios[currentIdx];

  const handleSelect = (optIdx: number) => {
    if (isSubmittedCurrent) return;
    sound.playClick();
    setSelectedOption(optIdx);
  };

  const handleSubmitChoice = () => {
    if (selectedOption === null) return;
    setIsSubmittedCurrent(true);
    const chosen = scenario.options[selectedOption];
    if (chosen.isCorrect) {
      sound.playSuccess();
    } else {
      sound.playError();
    }
  };

  const handleNextScenario = () => {
    sound.playClick();
    const updatedAnswers = { ...answers, [scenario.id]: selectedOption! };
    setAnswers(updatedAnswers);

    if (currentIdx + 1 < scenarios.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setIsSubmittedCurrent(false);
    } else {
      // Calculate final score: 5 scenarios, 2 points each = 10 points
      let correctCount = 0;
      scenarios.forEach((s) => {
        const userChoice = updatedAnswers[s.id];
        if (userChoice !== undefined && s.options[userChoice]?.isCorrect) {
          correctCount += 1;
        }
      });
      const calculatedTenScore = correctCount * 2;
      setIsFinished(true);
      onFinishChallenge(calculatedTenScore, updatedAnswers);
      sound.playSuccess();
    }
  };

  const handleRestart = () => {
    sound.playClick();
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsSubmittedCurrent(false);
    setAnswers({});
    setIsFinished(false);
  };

  // Determine Level from Score (out of 10)
  const getLevelInfo = (score: number) => {
    if (score >= 9) {
      return {
        level: 'AI Smart User',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        title: 'ผู้ใช้ AI อัจฉริยะและมีจริยธรรมยอดเยี่ยม',
        desc: 'คุณมีความรู้ความเข้าใจที่รอบด้าน สามารถใช้ AI เป็นคู่คิดได้อย่างปลอดภัย ตรวจสอบข้อมูลสม่ำเสมอ และยึดมั่นในความซื่อสัตย์ทางวิชาการอย่างน่าชื่นชม!',
        icon: <Award className="w-10 h-10 text-emerald-600" />
      };
    }
    if (score >= 7) {
      return {
        level: 'AI Ready',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
        title: 'พร้อมใช้งาน AI อย่างเข้าใจและปลอดภัย',
        desc: 'คุณมีพื้นฐานความเข้าใจที่ดีมาก พร้อมนำ AI ไปใช้ในการเรียนได้อย่างมีประสิทธิภาพ ระวังเรื่องการตรวจสอบแหล่งอ้างอิงให้เข้มข้นยิ่งขึ้นอีกนิดจะยอดเยี่ยมยิ่งขึ้น!',
        icon: <ShieldCheck className="w-10 h-10 text-blue-600" />
      };
    }
    if (score >= 5) {
      return {
        level: 'AI Beginner',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
        title: 'กำลังเริ่มต้น ควรทบทวนหลักการสำคัญ',
        desc: 'คุณเริ่มเข้าใจประโยชน์ของ AI แต่ยังมีบางจุดเรื่องความเป็นส่วนตัวและลิขสิทธิ์ที่ต้องระมัดระวังเป็นพิเศษ แนะนำให้ทบทวนบทเรียนที่ 3 และ 4 เพิ่มเติม',
        icon: <Lightbulb className="w-10 h-10 text-amber-600" />
      };
    }
    return {
      level: 'ควรเรียนรู้เพิ่มเติม',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
      title: 'ต้องการการเสริมสร้างทักษะ AI Literacy',
      desc: 'การใช้ AI โดยไม่ระวังอาจทำให้เกิดผลเสียต่อการเรียนและชื่อเสียง แนะนำให้กลับไปศึกษาบทเรียนทั้งหมดอย่างละเอียด แล้วกลับมาทดสอบใหม่อีกครั้งนะ!',
      icon: <AlertTriangle className="w-10 h-10 text-rose-600" />
    };
  };

  if (isFinished) {
    const finalScore = savedScore !== undefined ? savedScore : 10;
    const level = getLevelInfo(finalScore);

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-md text-center">
          <div className="flex justify-center mb-4">{level.icon}</div>

          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-1">
            ผลการประเมินสถานการณ์จำลอง
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            AI Smart Score ของคุณ
          </h2>

          <div className="inline-flex items-baseline gap-1.5 my-4 px-8 py-3 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-5xl font-black text-blue-600">{finalScore}</span>
            <span className="text-xl font-bold text-slate-400">/ 10</span>
            <span className="text-xs font-semibold text-slate-500 ml-2">คะแนน</span>
          </div>

          <div className="mb-6">
            <span
              className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold border ${level.badgeColor}`}
            >
              ระดับ: {level.level} — {level.title}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed mb-8">
            {level.desc}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onOpenCertificate();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Award className="w-4 h-4" />
              <span>ดูเกียรติบัตรรับรอง (Certificate)</span>
            </button>
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ทำแบบทดสอบใหม่อีกครั้ง</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onNavigateHome();
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl text-slate-600 hover:text-slate-900 text-sm font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>กลับสู่หน้าหลัก</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const chosenOptionObj = selectedOption !== null ? scenario.options[selectedOption] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => {
            sound.playClick();
            onNavigateHome();
          }}
          className="flex items-center gap-1 text-xs text-slate-600 hover:text-blue-600 font-medium cursor-pointer"
        >
          <Home className="w-3.5 h-3.5" />
          <span>หน้าหลัก</span>
        </button>
        <span className="text-xs text-slate-500 font-medium">
          สถานการณ์ที่ {currentIdx + 1} จาก {scenarios.length}
        </span>
      </div>

      {/* Scenario Container */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Scenario Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
              {scenario.badge}
            </span>
            <span className="text-xs text-slate-400">บทบาท: {scenario.studentRole}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
            {scenario.title}
          </h2>

          <div className="bg-white/10 rounded-2xl p-4 sm:p-5 border border-white/15 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2">
            <p>
              <strong className="text-cyan-300">สถานการณ์: </strong>
              {scenario.situation}
            </p>
            <p className="text-slate-300 text-xs">
              <strong>บริบทแวดล้อม: </strong>
              {scenario.context}
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="p-6 sm:p-8">
          <p className="text-xs sm:text-sm font-bold text-slate-900 mb-4">
            หากคุณเป็นนักเรียน/นักศึกษาในสถานการณ์นี้ คุณควรตัดสินใจอย่างไร?
          </p>

          <div className="space-y-3 mb-6">
            {scenario.options.map((opt, optIdx) => {
              const isSelected = selectedOption === optIdx;
              let btnStyle = 'border-slate-200 hover:border-blue-400 hover:bg-blue-50/20 text-slate-800';

              if (isSubmittedCurrent) {
                if (opt.isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-500';
                } else if (isSelected && !opt.isCorrect) {
                  btnStyle = 'border-rose-500 bg-rose-50 text-rose-950 ring-1 ring-rose-500';
                } else {
                  btnStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                btnStyle = 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500/30';
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelect(optIdx)}
                  disabled={isSubmittedCurrent}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer ${btnStyle}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 ${
                      isSubmittedCurrent && opt.isCorrect
                        ? 'bg-emerald-600 text-white'
                        : isSubmittedCurrent && isSelected && !opt.isCorrect
                        ? 'bg-rose-600 text-white'
                        : isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </div>
                  <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed">
                    {opt.text}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback & Analysis */}
          {isSubmittedCurrent && chosenOptionObj && (
            <div
              className={`p-5 rounded-2xl border mb-6 animate-fadeIn ${
                chosenOptionObj.isCorrect
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50/80 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm mb-2">
                {chosenOptionObj.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>คำตอบถูกต้อง!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>ยังไม่ถูกต้อง</span>
                  </>
                )}
              </div>

              <p className="text-xs sm:text-sm leading-relaxed mb-3">
                <strong>คำอธิบายเหตุผล: </strong>
                {chosenOptionObj.analysis}
              </p>

              <div className="pt-3 border-t border-black/10 text-xs font-medium flex items-start gap-1.5 text-slate-800">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>คำแนะนำจากผู้เชี่ยวชาญ: </strong>
                  {scenario.expertTip}
                </span>
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="flex justify-end pt-2">
            {!isSubmittedCurrent ? (
              <button
                onClick={handleSubmitChoice}
                disabled={selectedOption === null}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                  selectedOption !== null
                    ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-md shadow-blue-500/20'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>ยืนยันการตัดสินใจ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNextScenario}
                className="px-6 py-3 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-md flex items-center gap-2"
              >
                <span>
                  {currentIdx + 1 < scenarios.length ? 'สถานการณ์ถัดไป' : 'ดูผลคะแนนรวม'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
