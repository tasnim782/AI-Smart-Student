import { ChapterQuizResult } from '../types';

export const getQuizStorageKey = (chapterId: number): string => `quiz_${chapterId}_result`;

export const loadChapterQuizResult = (chapterId: number): ChapterQuizResult | null => {
  try {
    const raw = localStorage.getItem(getQuizStorageKey(chapterId));
    if (raw) {
      const parsed = JSON.parse(raw) as ChapterQuizResult;
      if (parsed && typeof parsed.chapterId === 'number' && parsed.status) {
        return parsed;
      }
    }
  } catch {
    // Ignore error
  }
  return null;
};

export const saveChapterQuizResult = (
  chapterId: number,
  score: number,
  totalQuestions: number,
  answers: number[]
): ChapterQuizResult => {
  const result: ChapterQuizResult = {
    chapterId,
    status: 'completed',
    score,
    totalQuestions,
    answers,
    completedAt: new Date().toISOString()
  };
  try {
    localStorage.setItem(getQuizStorageKey(chapterId), JSON.stringify(result));
  } catch {
    // Ignore error
  }
  return result;
};

export const resetChapterQuizResult = (chapterId: number): void => {
  try {
    localStorage.removeItem(getQuizStorageKey(chapterId));
  } catch {
    // Ignore error
  }
};
