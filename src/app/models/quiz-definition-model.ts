import {QuestionModel} from './question-model';

export class QuizDefinitionModel {
  id: number;
  numberOfQuestions: number;
  actualQuestion: number;
  question: QuestionModel;
}
