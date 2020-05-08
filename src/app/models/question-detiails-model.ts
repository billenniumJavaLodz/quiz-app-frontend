import { AnswerDetailsModel } from './answer-details-model';


export class QuestionDetailsModel {
  id: number;
  text: string;
  answers: AnswerDetailsModel[];
  timeToAnswer: number;
}
