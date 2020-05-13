import { QuizModel } from './quiz-model';

export class QuizPageModel {
    totalElements: number;
    pageNumber: number;
    pageSize: number;
    quizzes: QuizModel[];
}