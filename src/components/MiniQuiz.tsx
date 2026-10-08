import React, { useState, useEffect } from 'react';
import { QuizQuestion, ChapterQuizResult } from '../types';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Award } from 'lucide-react';
import { sound } from '../utils/sound';
import {
  loadChapterQuizResult,
  saveChapterQuizResult,
  resetChapterQuizResult
} from '../utils/quizStorage';

interface MiniQuizProps {
  chapterId: number;
  chapterTitle: string;
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  onReset?: () => void;
  savedScore?: number;
}

export const MiniQuiz: React.FC<MiniQuizProps> = ({
  chapterId,
  chapterTitle,
  questions,
  onComplete,
  onReset,
  savedScore
}) => {
  // Check if this specific chapter has a saved completed result
  const [savedResult, setSavedResult] = useState<ChapterQuizResult | null>(() => {
    const loaded = loadChapterQuizResult(chapterId);
    if (loaded && loaded.status === 'completed') {
      return loaded;
    }
    if (savedScore !== undefined) {
      return {
        chapterId,
        status: 'completed',
        score: savedScore,
        totalQuestions: questions.length,
        answers: []
      };
    }
    return null;
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState<boolean>(Boolean(savedResult && savedResult.status === 'completed'));

  // When chapterId changes, strictly synchronize and isolate state to this chapter only
  useEffect(() => {
    const loaded = loadChapterQuizResult(chapterId);
    if (loaded && loaded.status === 'completed') {
      setSavedResult(loaded);
      setQuizFinished(true);
    } else if (savedScore !== undefined) {
      setSavedResult({
        chapterId,
        status: 'completed',
        score: savedScore,
        totalQuestions: questions.length,
        answers: []
      });
      setQuizFinished(true);
    } else {
      setSavedResult(null);
      setQuizFinished(false);
    }

    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setUserAnswers([]);
  }, [chapterId, savedScore, questions.length]);

  const currentQ = questions[currentIndex];

  const handleSelect = (idx: number) => {
    if (isAnswerChecked) return;
    sound.playClick();
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || !currentQ) return;
    setIsAnswerChecked(true);
    const isCorrect = selectedOption === currentQ.correctAnswerIndex;
    if (isCorrect) {
      sound.playSuccess();
    } else {
      sound.playError();
    }
  };

  const handleNextQuestion = () => {
    sound.playClick();
    const newAnswers = [...userAnswers, selectedOption!];
    setUserAnswers(newAnswers);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      // Calculate final score for THIS specific chapter
      let finalScore = 0;
      newAnswers.forEach((ans, idx) => {
        if (ans === questions[idx]?.correctAnswerIndex) {
          finalScore += 1;
        }
      });

      // Save strictly to this chapter's dedicated storage
      const result = saveChapterQuizResult(chapterId, finalScore, questions.length, newAnswers);
      setSavedResult(result);
      setQuizFinished(true);
      onComplete(finalScore);
      sound.playSuccess();
    }
  };

  const handleRestart = () => {
    sound.playClick();
    // Reset ONLY this chapter's dedicated result
    resetChapterQuizResult(chapterId);
    setSavedResult(null);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setUserAnswers([]);
    setQuizFinished(false);
    if (onReset) {
      onReset();
    }
  };

  if (quizFinished && (savedResult || userAnswers.length > 0)) {
    const calculatedScore = savedResult ? savedResult.score : userAnswers.filter((ans, idx) => ans === questions[idx]?.correctAnswerIndex).length;

    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 text-center my-8 shadow-sm">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <Award className="w-8 h-8" />
        </div>
        <h4 className="text-xl font-bold text-slate-900 mb-1">
          คุณทำ Mini Quiz ประจำ{chapterTitle} เรียบร้อยแล้ว!
        </h4>
        <p className="text-sm text-slate-600 mb-4">
          ผลคะแนนการทดสอบความเข้าใจของคุณ:
        </p>

        <div className="inline-flex items-baseline gap-1 bg-slate-50 border border-slate-200 px-6 py-3 rounded-2xl mb-6">
          <span className="text-4xl font-extrabold text-blue-600">{calculatedScore}</span>
          <span className="text-lg font-semibold text-slate-500">/ {questions.length}</span>
          <span className="text-xs text-slate-500 ml-2 font-medium">คะแนน</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6">
          {calculatedScore === questions.length
            ? 'ยอดเยี่ยมมาก! คุณเข้าใจแนวคิดและหลักการของบทนี้ได้อย่างสมบูรณ์แบบ พร้อมก้าวสู่บทถัดไปแล้ว'
            : 'ทำได้ดีมาก! หากต้องการทบทวนอีกครั้งเพื่อเก็บคะแนนเต็ม สามารถกดทำแบบทดสอบใหม่ได้ตลอดเวลา'}
        </p>

        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-semibold transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>ทำแบบทดสอบใหม่อีกครั้ง</span>
        </button>
      </div>
    );
  }

  if (!currentQ) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm my-8">
      {/* Quiz Header */}
      <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
        <div>
          <span className="text-xs text-cyan-400 font-semibold tracking-wide uppercase block">
            Mini Quiz ทบทวนท้ายบท
          </span>
          <h4 className="text-base font-bold text-white">
            ข้อที่ {currentIndex + 1} จาก {questions.length}
          </h4>
        </div>
        <div className="flex gap-1.5">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                idx === currentIndex
                  ? 'bg-cyan-400 ring-2 ring-cyan-400/40'
                  : idx < currentIndex
                  ? 'bg-emerald-400'
                  : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quiz Body */}
      <div className="p-6">
        <h5 className="text-base sm:text-lg font-bold text-slate-900 mb-4 leading-snug">
          {currentQ.question}
        </h5>

        <div className="space-y-3 mb-6">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctAnswerIndex;

            let cardStyle = 'border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 text-slate-700';

            if (isAnswerChecked) {
              if (isCorrect) {
                cardStyle = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 ring-1 ring-emerald-500';
              } else if (isSelected && !isCorrect) {
                cardStyle = 'border-rose-500 bg-rose-50/70 text-rose-950 ring-1 ring-rose-500';
              } else {
                cardStyle = 'border-slate-200 bg-slate-50/60 text-slate-400 opacity-60';
              }
            } else if (isSelected) {
              cardStyle = 'border-blue-600 bg-blue-50/70 text-blue-900 ring-2 ring-blue-500/30';
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(idx)}
                disabled={isAnswerChecked}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${cardStyle}`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 ${
                    isAnswerChecked && isCorrect
                      ? 'bg-emerald-600 text-white'
                      : isAnswerChecked && isSelected && !isCorrect
                      ? 'bg-rose-600 text-white'
                      : isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </div>
                <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed">
                  {opt.text}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation box after check */}
        {isAnswerChecked && (
          <div
            className={`p-4 rounded-xl border mb-6 text-xs sm:text-sm animate-fadeIn ${
              selectedOption === currentQ.correctAnswerIndex
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-2 font-bold mb-1">
              {selectedOption === currentQ.correctAnswerIndex ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>คำตอบถูกต้อง!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span>คำตอบยังไม่ถูกต้อง</span>
                </>
              )}
            </div>
            <p className="leading-relaxed opacity-95">
              <strong className="font-semibold">คำอธิบาย: </strong>
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-end">
          {!isAnswerChecked ? (
            <button
              onClick={handleCheckAnswer}
              disabled={selectedOption === null}
              className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
                selectedOption !== null
                  ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-sm shadow-blue-500/20'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>ตรวจคำตอบ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-6 py-2.5 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-sm flex items-center gap-2"
            >
              <span>
                {currentIndex + 1 < questions.length ? 'ข้อถัดไป' : 'ดูสรุปผลคะแนน'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
