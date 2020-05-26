import { QuizQuestionModel } from './quiz-question-model';

export class QuizSaveModel {
    title: string;
    questions: QuizQuestionModel[];
    category: string; 
}