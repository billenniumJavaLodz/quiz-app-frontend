import {AnswerModel} from './answer-model';

export class AnswerDto {
  id: number;
  questionId: number;
  answer: AnswerModel;
}
