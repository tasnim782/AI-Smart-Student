/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CHAPTERS, CHALLENGE_SCENARIOS } from './data/chaptersData';
import { UserProgress } from './types';
import { Navbar } from './components/Navbar';
import { WelcomeView } from './views/WelcomeView';
import { HomeView } from './views/HomeView';
import { ChapterView } from './views/ChapterView';
import { ChallengeView } from './views/ChallengeView';
import { SummaryView } from './views/SummaryView';
import { CertificateModal } from './components/CertificateModal';

const STORAGE_KEY = 'ai_smart_student_progress_v1';

export default function App() {
  const [activeView, setActiveView] = useState<string>('welcome');
  const [currentChapterId, setCurrentChapterId] = useState<number>(1);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);

  // User Progress state with LocalStorage persistence
  const [progress, setProgress] = useState<UserProgress>(() => {
    let initial: UserProgress = {
      completedChapters: [],
      quizScores: {},
      challengeScore: 0,
      challengeCompleted: false,
      challengeAnswers: {},
      userName: ''
    };
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        initial = JSON.parse(saved);
      }
    } catch {
      // Fallback
    }

    // Synchronize individual quiz_${id}_result
    [1, 2, 3, 4].forEach((id) => {
      try {
        const item = localStorage.getItem(`quiz_${id}_result`);
        if (item) {
          const parsed = JSON.parse(item);
          if (parsed && parsed.status === 'completed' && typeof parsed.score === 'number') {
            initial.quizScores[id] = parsed.score;
            if (!initial.completedChapters.includes(id)) {
              initial.completedChapters.push(id);
            }
          }
        }
      } catch {
        // ignore
      }
    });

    return initial;
  });

  // Save progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore quota error
    }
  }, [progress]);

  // Handle Quiz completion for a chapter
  const handleSaveQuizScore = (chapterId: number, score: number) => {
    setProgress((prev) => {
      const alreadyCompleted = prev.completedChapters.includes(chapterId);
      const updatedCompleted = alreadyCompleted
        ? prev.completedChapters
        : [...prev.completedChapters, chapterId];

      return {
        ...prev,
        completedChapters: updatedCompleted,
        quizScores: {
          ...prev.quizScores,
          [chapterId]: score
        }
      };
    });
  };

  // Handle Quiz reset for a specific chapter only
  const handleResetQuizScore = (chapterId: number) => {
    setProgress((prev) => {
      const newScores = { ...prev.quizScores };
      delete newScores[chapterId];
      return {
        ...prev,
        quizScores: newScores
      };
    });
  };

  // Handle Challenge completion
  const handleFinishChallenge = (score: number, answers: Record<number, number>) => {
    setProgress((prev) => ({
      ...prev,
      challengeScore: score,
      challengeCompleted: true,
      challengeAnswers: answers
    }));
  };

  const handleUpdateUserName = (name: string) => {
    setProgress((prev) => ({
      ...prev,
      userName: name
    }));
  };

  // View Navigation
  const handleNavigate = (view: string, chapterId?: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (view === 'chapter') {
      const id = chapterId || 1;
      setCurrentChapterId(id);
      setActiveView(`chapter-${id}`);
    } else {
      setActiveView(view);
    }
  };

  const handleSelectChapter = (id: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentChapterId(id);
    setActiveView(`chapter-${id}`);
  };

  // Rank determination for certificate
  const getRankTitle = (score: number) => {
    if (score >= 9) return 'AI Smart User (ยอดเยี่ยม)';
    if (score >= 7) return 'AI Ready (พร้อมใช้งานอย่างปลอดภัย)';
    if (score >= 5) return 'AI Beginner (ระดับเริ่มต้น)';
    return 'ผู้มุ่งมั่นพัฒนาทักษะ AI Literacy';
  };

  const currentChapter = CHAPTERS.find((c) => c.id === currentChapterId) || CHAPTERS[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navbar */}
      <Navbar
        activeView={activeView}
        onNavigate={handleNavigate}
        completedCount={progress.completedChapters.length}
        totalChapters={CHAPTERS.length}
        challengeCompleted={progress.challengeCompleted}
      />

      {/* Main View Container */}
      <main className="flex-1">
        {activeView === 'welcome' && (
          <WelcomeView
            onStart={() => handleNavigate('home')}
            completedCount={progress.completedChapters.length}
            totalChapters={CHAPTERS.length}
          />
        )}

        {activeView === 'home' && (
          <HomeView
            chapters={CHAPTERS}
            completedChapters={progress.completedChapters}
            quizScores={progress.quizScores}
            challengeCompleted={progress.challengeCompleted}
            challengeScore={progress.challengeScore}
            onSelectChapter={handleSelectChapter}
            onOpenChallenge={() => handleNavigate('challenge')}
            onOpenSummary={() => handleNavigate('summary')}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        )}

        {activeView.startsWith('chapter-') && (
          <ChapterView
            chapter={currentChapter}
            chaptersCount={CHAPTERS.length}
            onNavigateHome={() => handleNavigate('home')}
            onSelectChapter={handleSelectChapter}
            onSaveQuizScore={handleSaveQuizScore}
            onResetQuizScore={handleResetQuizScore}
            savedQuizScore={progress.quizScores[currentChapter.id]}
          />
        )}

        {activeView === 'challenge' && (
          <ChallengeView
            scenarios={CHALLENGE_SCENARIOS}
            onFinishChallenge={handleFinishChallenge}
            savedScore={progress.challengeCompleted ? progress.challengeScore : undefined}
            savedAnswers={progress.challengeAnswers}
            onNavigateHome={() => handleNavigate('home')}
            onOpenCertificate={() => setIsCertificateOpen(true)}
            userName={progress.userName || ''}
          />
        )}

        {activeView === 'summary' && (
          <SummaryView
            onNavigateHome={() => handleNavigate('home')}
            onOpenChallenge={() => handleNavigate('challenge')}
            onOpenCertificate={() => setIsCertificateOpen(true)}
            challengeCompleted={progress.challengeCompleted}
          />
        )}
      </main>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        score={progress.challengeScore}
        totalScore={10}
        userName={progress.userName || ''}
        onUpdateUserName={handleUpdateUserName}
        rankTitle={getRankTitle(progress.challengeScore)}
      />

      {/* Global Minimalist Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">AI Smart Student</span>
            <span aria-hidden="true">·</span>
            <span>เรียนรู้ AI ใช้อย่างฉลาดและรับผิดชอบ</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>สื่อการเรียนรู้สำหรับนักเรียนและนักศึกษา</span>
            <span aria-hidden="true">·</span>
            <span>ตามแนวทางกระทรวงศึกษาธิการ & UNESCO</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
