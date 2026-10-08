import React from 'react';
import { SUMMARY_PILLARS, REFERENCES_LIST } from '../data/chaptersData';
import {
  Cpu,
  Compass,
  CheckCircle2,
  ShieldAlert,
  FileCheck,
  HeartHandshake,
  Award,
  BookOpen,
  ArrowRight,
  Home,
  Sparkles,
  ExternalLink,
  Quote
} from 'lucide-react';
import { sound } from '../utils/sound';

interface SummaryViewProps {
  onNavigateHome: () => void;
  onOpenChallenge: () => void;
  onOpenCertificate: () => void;
  challengeCompleted: boolean;
}

export const SummaryView: React.FC<SummaryViewProps> = ({
  onNavigateHome,
  onOpenChallenge,
  onOpenCertificate,
  challengeCompleted
}) => {
  const getPillarIcon = (name: string) => {
    switch (name) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-blue-600" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-sky-600" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-indigo-600" />;
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-amber-600" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-rose-600" />;
      case 'Award':
        return <Award className="w-5 h-5 text-cyan-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Nav */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => {
            sound.playClick();
            onNavigateHome();
          }}
          className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-blue-600 font-medium cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>กลับสู่หน้าหลัก</span>
        </button>

        <div className="flex items-center gap-2">
          {challengeCompleted && (
            <button
              onClick={() => {
                sound.playClick();
                onOpenCertificate();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
            >
              <Award className="w-3.5 h-3.5" />
              <span>เกียรติบัตรของคุณ</span>
            </button>
          )}
        </div>
      </div>

      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs uppercase font-bold tracking-widest text-blue-600 block mb-2">
          AI Smart Student Infographic Summary
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
          7 เสาหลักที่นักเรียนนักศึกษาควรจำ
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          สรุปหัวใจสำคัญในการเป็นผู้ใช้ปัญญาประดิษฐ์อย่างชาญฉลาด ปลอดภัย และมีความรับผิดชอบต่อตนเองและสังคม
        </p>
      </div>

      {/* 7 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {SUMMARY_PILLARS.map((pillar, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  {getPillarIcon(pillar.iconName)}
                </div>
                <span className="text-xs font-bold text-slate-400">
                  เสาหลักที่ {idx + 1}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {pillar.title}
              </h3>
              <span className="text-xs font-semibold text-blue-600 block mb-2">
                {pillar.subtitle}
              </span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {pillar.desc}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>AI Smart Student</span>
              <span className="font-semibold text-blue-600">จดจำและนำไปใช้</span>
            </div>
          </div>
        ))}

        {/* 8th Card: Visual Concept Card */}
        <div className="bg-gradient-to-br from-blue-900 to-indigo-950 rounded-3xl p-6 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-xs text-cyan-300 uppercase font-bold tracking-wider block mb-1">
              หัวใจสำคัญ
            </span>
            <h3 className="text-lg font-bold mb-2">AI Literacy สำหรับคนรุ่นใหม่</h3>
            <p className="text-xs text-blue-200 leading-relaxed mb-4">
              เทคโนโลยีเป็นเพียงเครื่องมือ แต่คุณค่าที่แท้จริงเกิดจากปัญญาและจิตสำนึกของมนุษย์
            </p>
          </div>
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                sound.playClick();
                onOpenChallenge();
              }}
              className="text-xs font-bold text-cyan-300 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <span>ทดสอบความพร้อมใน Challenge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Core Motto Card */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-8 sm:p-10 text-white text-center shadow-lg mb-16 relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <Quote className="w-10 h-10 text-white/30 mx-auto mb-3" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-snug mb-4">
            “AI เป็นเครื่องมือที่ช่วยให้เราเรียนรู้ได้ดีขึ้น แต่ผู้ใช้ยังคงต้องคิด วิเคราะห์ ตรวจสอบ และรับผิดชอบต่อการใช้งาน”
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 font-medium">
            หลักการสำคัญจากกระทรวงศึกษาธิการและมาตรฐานการศึกษาศตวรรษที่ 21
          </p>
        </div>
      </div>

      {/* Concept Illustration & References Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Concept Illustration */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm overflow-hidden">
            <img
              src="/src/assets/images/ai_literacy_concept_shield_1791452581825.jpg"
              alt="AI Literacy Concept"
              referrerPolicy="no-referrer"
              className="w-full h-auto aspect-4/3 object-cover rounded-2xl"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            {/* Fallback container */}
            <div
              style={{ display: 'none' }}
              className="w-full aspect-4/3 bg-slate-900 rounded-2xl text-white p-6 flex flex-col justify-center items-center text-center"
            >
              <ShieldAlert className="w-10 h-10 text-cyan-400 mb-2" />
              <h4 className="font-bold text-sm">AI Literacy & Academic Integrity</h4>
              <p className="text-xs text-slate-300 mt-1">เกราะกำบังทางจริยธรรมเพื่อการศึกษา</p>
            </div>
            <div className="p-3 text-center">
              <span className="text-xs font-semibold text-slate-700">
                AI Literacy: สมดุลระหว่างการใช้เทคโนโลยี จริยธรรม และการคุ้มครองข้อมูล
              </span>
            </div>
          </div>
        </div>

        {/* References List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-900">
              แหล่งเรียนรู้และเอกสารอ้างอิงทางวิชาการ
            </h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            เนื้อหาในแอปพลิเคชันนี้ได้รับการพัฒนาขึ้นโดยอ้างอิงและสอดคล้องกับแนวทางสากลและในประเทศ:
          </p>

          <div className="space-y-3">
            {REFERENCES_LIST.map((ref, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {ref.title}
                    </h4>
                    <span className="text-xs font-semibold text-blue-600 block mt-0.5">
                      {ref.organization} ({ref.year})
                    </span>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {ref.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Navigation CTA */}
      <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => {
            sound.playClick();
            onNavigateHome();
          }}
          className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm font-semibold transition-colors cursor-pointer"
        >
          กลับสู่หน้าหลัก
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onOpenChallenge();
          }}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <span>{challengeCompleted ? 'ทบทวน AI Challenge' : 'เริ่มทำ AI Challenge ตอนนี้'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
