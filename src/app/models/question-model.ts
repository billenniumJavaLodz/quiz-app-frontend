import {AnswerModel} from './answer-model';

export class QuestionModel {
  id: number;
  text: string;
  answers: AnswerModel[];
  timeToAnswer: number;
  image: string;
}
