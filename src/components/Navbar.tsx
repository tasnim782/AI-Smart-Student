import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, CheckCircle2, Award } from 'lucide-react';
import { sound } from '../utils/sound';

interface NavbarProps {
  activeView: string;
  onNavigate: (view: string, chapterId?: number) => void;
  completedCount: number;
  totalChapters: number;
  challengeCompleted: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
  completedCount,
  totalChapters,
  challengeCompleted
}) => {
  const [isMuted, setIsMuted] = useState(sound.getIsMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleNavClick = (view: string, chapterId?: number) => {
    sound.playClick();
    onNavigate(view, chapterId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('welcome')}
          className="text-lg sm:text-xl font-bold tracking-tight text-blue-900 flex items-center gap-2 text-left cursor-pointer hover:opacity-90 transition-opacity"
        >
          <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-extrabold text-sm shadow-xs">
            AI
          </span>
          <span className="font-extrabold text-slate-900">
            Smart <span className="text-blue-600">Student</span>
          </span>
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors cursor-pointer hover:text-blue-600 ${
              activeView === 'home' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            บทเรียนทั้งหมด
          </button>
          <button
            onClick={() => handleNavClick('chapter', 1)}
            className={`transition-colors cursor-pointer hover:text-blue-600 ${
              activeView === 'chapter-1' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            บทที่ 1 รู้จัก AI
          </button>
          <button
            onClick={() => handleNavClick('chapter', 2)}
            className={`transition-colors cursor-pointer hover:text-blue-600 ${
              activeView === 'chapter-2' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            บทที่ 2 ใช้ให้เป็น
          </button>
          <button
            onClick={() => handleNavClick('chapter', 3)}
            className={`transition-colors cursor-pointer hover:text-blue-600 ${
              activeView === 'chapter-3' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            บทที่ 3 รู้เท่าทัน
          </button>
          <button
            onClick={() => handleNavClick('chapter', 4)}
            className={`transition-colors cursor-pointer hover:text-blue-600 ${
              activeView === 'chapter-4' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            บทที่ 4 ใช้รับผิดชอบ
          </button>
          <button
            onClick={() => handleNavClick('challenge')}
            className={`transition-colors cursor-pointer hover:text-blue-600 flex items-center gap-1.5 ${
              activeView === 'challenge' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            <span>AI Challenge</span>
            {challengeCompleted && (
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            )}
          </button>
          <button
            onClick={() => handleNavClick('summary')}
            className={`transition-colors cursor-pointer hover:text-blue-600 ${
              activeView === 'summary' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            สรุปใจความ
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Audio toggle button */}
          <button
            onClick={toggleSound}
            title={isMuted ? 'เปิดเสียงเอฟเฟกต์' : 'ปิดเสียงเอฟเฟกต์'}
            className="w-9 h-9 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-blue-600" />}
          </button>

          {/* Quick Progress indicator */}
          <button
            onClick={() => handleNavClick('home')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold cursor-pointer hover:bg-blue-100 transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            <span>เรียนแล้ว {completedCount}/{totalChapters} บท</span>
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-1 shadow-lg animate-fadeIn">
          <div className="py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            เมนูการเรียนรู้
          </div>
          <button
            onClick={() => handleNavClick('home')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center justify-between"
          >
            <span>หน้าหลัก (Dashboard)</span>
            <span className="text-xs text-blue-600 font-semibold">{completedCount}/{totalChapters} บท</span>
          </button>
          <button
            onClick={() => handleNavClick('chapter', 1)}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100"
          >
            บทที่ 1 : รู้จัก AI
          </button>
          <button
            onClick={() => handleNavClick('chapter', 2)}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100"
          >
            บทที่ 2 : ใช้ AI ให้เป็น
          </button>
          <button
            onClick={() => handleNavClick('chapter', 3)}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100"
          >
            บทที่ 3 : รู้เท่าทัน AI
          </button>
          <button
            onClick={() => handleNavClick('chapter', 4)}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100"
          >
            บทที่ 4 : ใช้ AI อย่างรับผิดชอบ
          </button>
          <button
            onClick={() => handleNavClick('challenge')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 flex items-center justify-between mt-2"
          >
            <span>AI Challenge (สถานการณ์จำลอง 5 ข้อ)</span>
            <Award className="w-4 h-4 text-blue-600" />
          </button>
          <button
            onClick={() => handleNavClick('summary')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100"
          >
            สรุปใจความสำคัญ & แหล่งอ้างอิง
          </button>
        </div>
      )}
    </header>
  );
};
