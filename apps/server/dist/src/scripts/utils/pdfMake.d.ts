import { type Question, type QuizType, type TheoryQuestion } from '../../types/index.js';
export declare function generateQuizPDFWithPdfMake(quizData: (Question | TheoryQuestion)[], quizTitle: string, quizType: QuizType, quizTags?: string[]): Promise<Uint8Array>;
