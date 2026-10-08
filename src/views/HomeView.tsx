import React from 'react';
import { Chapter } from '../types';
import {
  Cpu,
  Compass,
  ShieldAlert,
  Lock,
  Award,
  ArrowRight,
  CheckCircle2,
  Clock,
  BookOpen,
  Sparkles,
  Layers,
  FileText
} from 'lucide-react';
import { sound } from '../utils/sound';

interface HomeViewProps {
  chapters: Chapter[];
  completedChapters: number[];
  quizScores: Record<number, number>;
  challengeCompleted: boolean;
  challengeScore: number;
  onSelectChapter: (chapterId: number) => void;
  onOpenChallenge: () => void;
  onOpenSummary: () => void;
  onOpenCertificate: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  chapters,
  completedChapters,
  quizScores,
  challengeCompleted,
  challengeScore,
  onSelectChapter,
  onOpenChallenge,
  onOpenSummary,
  onOpenCertificate
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-blue-600" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-sky-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-teal-600" />;
      case 'Lock':
        return <Lock className="w-6 h-6 text-indigo-600" />;
      default:
        return <BookOpen className="w-6 h-6 text-blue-600" />;
    }
  };

  const progressPercentage = Math.round((completedChapters.length / chapters.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Banner & Progress Card */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white mb-10 shadow-lg relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8">
            <span className="text-xs uppercase font-bold tracking-widest text-cyan-300 block mb-2">
              หลักสูตร AI สำหรับนักเรียนและนักศึกษา
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">
              ภาพรวมการเรียนรู้ของคุณ
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm max-w-xl leading-relaxed">
              ศึกษาเนื้อหาทั้ง 4 บท ทำแบบทดสอบท้ายบท (Mini Quiz) และทดสอบความพร้อมใน AI Challenge เพื่อก้าวเป็นผู้ใช้ AI ที่มีจริยธรรม
            </p>
          </div>

          <div className="md:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-blue-200">ความคืบหน้าภาพรวม</span>
              <span className="text-sm font-bold text-cyan-300">{progressPercentage}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-blue-200">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300" />
                เรียนไปแล้ว {completedChapters.length}/{chapters.length} บท
              </span>
              <span>
                {challengeCompleted ? 'ผ่าน Challenge แล้ว' : 'ยังไม่ได้ทำ Challenge'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters Grid Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            สารบัญบทเรียน (Learning Modules)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            คลิกที่การ์ดบทเรียนเพื่อเริ่มอ่านเนื้อหาและทำกิจกรรม Interactive
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onOpenSummary();
            }}
            className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-blue-600" />
            <span>สรุป 7 ข้อควรจำ</span>
          </button>
          {challengeCompleted && (
            <button
              onClick={() => {
                sound.playClick();
                onOpenCertificate();
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Award className="w-4 h-4" />
              <span>ดูเกียรติบัตร</span>
            </button>
          )}
        </div>
      </div>

      {/* Chapters Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {chapters.map((chapter) => {
          const isCompleted = completedChapters.includes(chapter.id);
          const score = quizScores[chapter.id];

          return (
            <div
              key={chapter.id}
              onClick={() => {
                sound.playClick();
                onSelectChapter(chapter.id);
              }}
              className="group bg-white rounded-3xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Card Top Row */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                    {getIcon(chapter.iconName)}
                  </div>

                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        เรียนแล้ว {score !== undefined ? `(${score}/${chapter.quiz.length})` : ''}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        {chapter.estimatedMinutes} นาที
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5">
                  {chapter.title}
                </h3>
                <p className="text-xs font-semibold text-blue-700 mb-2">
                  {chapter.subtitle}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed mb-6 line-clamp-2">
                  {chapter.description}
                </p>
              </div>

              {/* Card Bottom CTA */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">
                  {chapter.cards.length} หัวข้อสำคัญ + Mini Quiz
                </span>
                <span className="font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>{isCompleted ? 'ทบทวนเนื้อหา' : 'เริ่มเรียนบทนี้'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Challenge Featured Section */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ไฮไลต์พิเศษสำหรับนักศึกษา</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              AI Challenge : 5 สถานการณ์จำลองชีวิตจริง
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              ทดสอบการตัดสินใจของคุณในสถานการณ์จริงที่พบบ่อยในรั้วโรงเรียนและมหาวิทยาลัย
              เช่น เมื่อเจอ AI Hallucination, ข้อมูลลับของเพื่อน, การส่งรายงาน, ลิขสิทธิ์ภาพ และการอ้างอิง
            </p>
            {challengeCompleted && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-900/60 border border-emerald-500/50 text-emerald-300 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>คะแนน AI Smart Score ของคุณ: {challengeScore} / 10 คะแนน</span>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
            <button
              onClick={() => {
                sound.playClick();
                onOpenChallenge();
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-400/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>{challengeCompleted ? 'ทำ Challenge อีกครั้ง' : 'เริ่มทำ AI Challenge'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-[11px] text-slate-400 mt-2">
              ใช้เวลาประมาณ 3–5 นาที · คำนวณคะแนนและระดับอัตโนมัติ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
