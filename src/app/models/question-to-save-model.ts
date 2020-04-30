import { AnswerToSaveModel } from './answer-to-save-model';

export class QuestionToSaveModel {
    text: string;
    timeToAnswer: number
    answers: AnswerToSaveModel[];
}