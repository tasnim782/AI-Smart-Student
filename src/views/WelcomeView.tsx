import React from 'react';
import { ArrowRight, BookOpen, ShieldCheck, Sparkles, CheckCircle2, Award, Users, Scale } from 'lucide-react';
import { sound } from '../utils/sound';

interface WelcomeViewProps {
  onStart: () => void;
  completedCount: number;
  totalChapters: number;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({
  onStart,
  completedCount,
  totalChapters
}) => {
  const handleStartClick = () => {
    sound.playClick();
    onStart();
  };

  const objectives = [
    'เข้าใจพื้นฐานและการทำงานของ AI ในชีวิตประจำวัน',
    'รู้จักประโยชน์และตระหนักถึงข้อจำกัดของ AI',
    'ใช้ AI เป็นเครื่องมือช่วยในการเรียนได้อย่างเหมาะสม',
    'ตรวจสอบความถูกต้องของข้อมูลและจับผิด AI Hallucination',
    'รักษาความเป็นส่วนตัวและข้อมูลส่วนบุคคลตามกฎหมาย PDPA',
    'เข้าใจจริยธรรมในการใช้ AI ไม่ทำร้ายหรือหลอกลวงผู้อื่น',
    'เคารพลิขสิทธิ์และยึดมั่นในความซื่อสัตย์ทางวิชาการ',
    'ตัดสินใจเลือกใช้ AI ได้อย่างปลอดภัยและมีความรับผิดชอบ'
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>สื่อมัลติมีเดียเพื่อการเรียนรู้สำหรับนักเรียนและนักศึกษา</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              AI Smart Student
              <span className="block text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mt-2">
                เรียนรู้ AI ใช้อย่างฉลาดและรับผิดชอบ
              </span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
              พัฒนาทักษะ <strong className="text-slate-800 font-semibold">AI Literacy</strong> ให้พร้อมสำหรับศตวรรษที่ 21
              อ้างอิงแนวคิดจากคู่มือการใช้ AI ของกระทรวงศึกษาธิการและ UNESCO
              เน้นการเรียนรู้แบบ Interactive ฝึกคิดวิเคราะห์ ไม่ให้ AI แย่งทักษะการเรียนรู้ไปจากคุณ
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={handleStartClick}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-base shadow-lg shadow-blue-500/25 flex items-center justify-center gap-3 transition-all hover:translate-y-[-1px] cursor-pointer"
              >
                <span>{completedCount > 0 ? 'เรียนต่อจากเดิม' : 'เริ่มเรียนรู้ทันที'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              {completedCount > 0 && (
                <div className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>บันทึกความคืบหน้าไว้แล้ว ({completedCount}/{totalChapters} บท)</span>
                </div>
              )}
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
              <div>
                <span className="block text-2xl font-extrabold text-blue-700">4 บท</span>
                <span className="text-xs text-slate-500">บทเรียนหลักแบบ Interactive</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-blue-700">5 ข้อ</span>
                <span className="text-xs text-slate-500">สถานการณ์จำลอง AI Challenge</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-blue-700">100%</span>
                <span className="text-xs text-slate-500">ทดลองใช้งานได้จริงทันที</span>
              </div>
            </div>
          </div>

          {/* Right Image / Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white">
              <img
                src="/src/assets/images/hero_ai_student_learning_1791452572030.jpg"
                alt="AI Smart Student Illustration"
                referrerPolicy="no-referrer"
                className="w-full h-auto aspect-16/10 object-cover"
                onError={(e) => {
                  // Resilient fallback container if image load fails
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              {/* Fallback container */}
              <div
                style={{ display: 'none' }}
                className="w-full aspect-16/10 bg-gradient-to-tr from-blue-900 via-blue-800 to-indigo-900 text-white p-8 flex flex-col justify-center items-center text-center"
              >
                <Sparkles className="w-12 h-12 text-cyan-300 mb-3" />
                <h3 className="text-xl font-bold">AI Smart Student</h3>
                <p className="text-xs text-blue-200 mt-1">เรียนรู้ AI ใช้อย่างฉลาดและรับผิดชอบ</p>
              </div>

              {/* Floating Badge Card */}
              <div className="p-4 bg-white/95 backdrop-blur-md border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">AI Ethics & Literacy</span>
                    <span className="text-[11px] text-slate-500">มุ่งเน้นนักเรียนและนักศึกษา</span>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                  Official Standard
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8 Core Objectives Grid */}
      <section className="bg-white py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              8 จุดประสงค์การเรียนรู้ของ “AI Smart Student”
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              ออกแบบมาเพื่อเสริมสร้างทักษะและภูมิคุ้มกันทางดิจิทัลให้ผู้เรียนก้าวทันเทคโนโลยีอย่างปลอดภัย
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {objectives.map((obj, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-blue-50/40 hover:border-blue-200 transition-colors flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {obj}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <footer className="py-6 text-center text-xs text-slate-500">
        <p>AI Smart Student — สื่อการเรียนรู้สำหรับนักเรียนระดับมัธยมปลายและนักศึกษาระดับอุดมศึกษา</p>
        <p className="mt-1 text-slate-400">อ้างอิงแนวคิดจากคู่มือการใช้ AI ของกระทรวงศึกษาธิการ และกรอบสมรรถนะ UNESCO</p>
      </footer>
    </div>
  );
};
