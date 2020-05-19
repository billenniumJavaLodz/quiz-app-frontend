import { AnswerToUpdateModel } from './answer-to-update-model';

export class QuestionToUpdateModel{
    id:number;
    text: string;
    timeToAnswer: number;
    answers: AnswerToUpdateModel[];
}