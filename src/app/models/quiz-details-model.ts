import { QuizModel } from './quiz-model';
import { QuestionDetailsModel } from './question-detiails-model';

export class QuizDetailsModel extends QuizModel{
    questions: QuestionDetailsModel[];
}