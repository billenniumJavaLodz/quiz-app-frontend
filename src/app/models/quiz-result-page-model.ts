import { CandidateResultModel } from './candidate-result-model';

export class QuizResultPageModel {
    totalElements: number;
    pageNumber: number;
    pageSize: number;
    candidateResults: CandidateResultModel[];
}