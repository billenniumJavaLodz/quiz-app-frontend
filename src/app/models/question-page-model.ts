import { QuestionDetailsModel } from './question-detiails-model';

export class QuestionPageModel{
    totalElements: number;
    pageNumber:number;
    pageSize:number;
    questions: QuestionDetailsModel[];
}