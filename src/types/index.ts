export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  scenarioContext?: string;
  options: QuizOption[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface ChapterCard {
  id: string;
  title: string;
  subtitle?: string;
  content: string[];
  keyPoints?: string[];
  iconName: string;
  highlightBadge?: string;
  interactiveWidget?: 'prompt-lab' | 'scenario-checker' | 'privacy-scanner' | 'fact-checker' | 'comparison';
}

export interface Chapter {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  estimatedMinutes: number;
  topicsCount: number;
  cards: ChapterCard[];
  quiz: QuizQuestion[];
}

export interface ChallengeScenario {
  id: number;
  title: string;
  badge: string;
  situation: string;
  studentRole: string;
  context: string;
  options: {
    text: string;
    isCorrect: boolean;
    analysis: string;
  }[];
  expertTip: string;
}

export interface UserProgress {
  completedChapters: number[];
  quizScores: Record<number, number>; // chapterId -> score
  challengeScore: number;
  challengeCompleted: boolean;
  challengeAnswers: Record<number, number>;
  userName?: string;
}

export interface ChapterQuizResult {
  chapterId: number;
  status: 'not_started' | 'in_progress' | 'completed';
  score: number;
  totalQuestions: number;
  answers: number[];
  completedAt?: string;
}
