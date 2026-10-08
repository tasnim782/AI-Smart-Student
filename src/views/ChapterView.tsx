import React, { useState } from 'react';
import { Chapter } from '../types';
import {
  ArrowLeft,
  ArrowRight,
  Home,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  BookOpen,
  Smartphone,
  GraduationCap,
  TrendingUp,
  Cpu,
  UserCheck,
  PenTool,
  SplitSquareVertical,
  Ghost,
  Scale,
  Key,
  HeartHandshake,
  FileCheck,
  Award,
  HelpCircle
} from 'lucide-react';
import { MiniQuiz } from '../components/MiniQuiz';
import { PromptLab } from '../components/PromptLab';
import { ScenarioChecker } from '../components/ScenarioChecker';
import { PrivacyScanner } from '../components/PrivacyScanner';
import { sound } from '../utils/sound';

interface ChapterViewProps {
  chapter: Chapter;
  chaptersCount: number;
  onNavigateHome: () => void;
  onSelectChapter: (id: number) => void;
  onSaveQuizScore: (chapterId: number, score: number) => void;
  onResetQuizScore?: (chapterId: number) => void;
  savedQuizScore?: number;
}

export const ChapterView: React.FC<ChapterViewProps> = ({
  chapter,
  chaptersCount,
  onNavigateHome,
  onSelectChapter,
  onSaveQuizScore,
  onResetQuizScore,
  savedQuizScore
}) => {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  const getCardIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-blue-600" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-sky-600" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-indigo-600" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-emerald-600" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-6 h-6 text-amber-600" />;
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-blue-600" />;
      case 'Lightbulb':
        return <Lightbulb className="w-6 h-6 text-amber-500" />;
      case 'PenTool':
        return <PenTool className="w-6 h-6 text-violet-600" />;
      case 'SplitSquareVertical':
        return <SplitSquareVertical className="w-6 h-6 text-cyan-600" />;
      case 'Ghost':
        return <Ghost className="w-6 h-6 text-rose-600" />;
      case 'Scale':
        return <Scale className="w-6 h-6 text-teal-600" />;
      case 'Key':
        return <Key className="w-6 h-6 text-indigo-600" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-rose-500" />;
      case 'FileCheck':
        return <FileCheck className="w-6 h-6 text-sky-600" />;
      case 'Award':
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <BookOpen className="w-6 h-6 text-blue-600" />;
    }
  };

  const handlePrevChapter = () => {
    if (chapter.id > 1) {
      sound.playClick();
      onSelectChapter(chapter.id - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextChapter = () => {
    if (chapter.id < chaptersCount) {
      sound.playClick();
      onSelectChapter(chapter.id + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Breadcrumb & Nav */}
      <div className="flex items-center justify-between gap-4 mb-6 text-xs text-slate-500">
        <button
          onClick={() => {
            sound.playClick();
            onNavigateHome();
          }}
          className="flex items-center gap-1.5 text-slate-600 hover:text-blue-600 font-medium transition-colors cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>หน้าหลัก</span>
        </button>

        <div className="flex items-center gap-2">
          <span>บทที่ {chapter.id} จาก {chaptersCount}</span>
        </div>
      </div>

      {/* Chapter Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-3">
          <span>โมดูลการเรียนรู้ที่ {chapter.id}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
          {chapter.title}
        </h1>
        <p className="text-sm sm:text-base font-semibold text-blue-700 mb-3">
          {chapter.subtitle}
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          {chapter.description}
        </p>
      </div>

      {/* Chapter Cards Content */}
      <div className="space-y-6 mb-12">
        {chapter.cards.map((card, idx) => (
          <div
            key={card.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                {getCardIcon(card.iconName)}
              </div>
              <div className="flex-1">
                <span className="text-xs font-bold text-slate-400 block mb-0.5">
                  หัวข้อที่ {idx + 1}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {card.title}
                </h3>
                {card.subtitle && (
                  <p className="text-xs sm:text-sm font-medium text-blue-700 mt-0.5">
                    {card.subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Paragraphs */}
            <div className="space-y-3 mb-5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {card.content.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>

            {/* Key Takeaways Box */}
            {card.keyPoints && card.keyPoints.length > 0 && (
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80 mb-2">
                <span className="text-xs font-bold text-slate-900 block mb-2.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  สาระสำคัญที่ต้องจำ:
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {card.keyPoints.map((point, kIdx) => (
                    <li key={kIdx} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-0.5">•</span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Interactive Embedded Widgets */}
            {card.interactiveWidget === 'prompt-lab' && <PromptLab />}
            {card.interactiveWidget === 'scenario-checker' && <ScenarioChecker />}
            {card.interactiveWidget === 'privacy-scanner' && <PrivacyScanner />}
          </div>
        ))}
      </div>

      {/* Mini Quiz Section */}
      <div className="border-t border-slate-200 pt-8">
        <MiniQuiz
          key={`mini-quiz-chapter-${chapter.id}`}
          chapterId={chapter.id}
          chapterTitle={chapter.title}
          questions={chapter.quiz}
          onComplete={(score) => onSaveQuizScore(chapter.id, score)}
          onReset={() => onResetQuizScore?.(chapter.id)}
          savedScore={savedQuizScore}
        />
      </div>

      {/* Next / Prev Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200 mt-8">
        <button
          onClick={handlePrevChapter}
          disabled={chapter.id <= 1}
          className={`w-full sm:w-auto px-5 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
            chapter.id > 1
              ? 'border-slate-300 text-slate-700 hover:bg-slate-100'
              : 'border-slate-200 text-slate-300 cursor-not-allowed opacity-50'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>บทก่อนหน้า</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onNavigateHome();
          }}
          className="text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-900 cursor-pointer"
        >
          กลับสู่สารบัญบทเรียน
        </button>

        <button
          onClick={handleNextChapter}
          disabled={chapter.id >= chaptersCount}
          className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer ${
            chapter.id < chaptersCount
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-50'
          }`}
        >
          <span>บทถัดไป</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
