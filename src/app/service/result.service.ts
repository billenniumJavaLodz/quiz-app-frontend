import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ResultModel } from "../models/result.model";
import { environment } from "../../environments/environment";
import { QuizResultPageModel } from '../models/quiz-result-page-model';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private result = 'result/';
  private quiz = 'quiz/';

  constructor(private httpClient: HttpClient) {
  }

  getCandidateResult(id: string): Observable<ResultModel> {
    return this.httpClient.get<ResultModel>(environment.baseUrl + this.result + id);
  }

  getQuizResultPage(id: number, pageSize:string, pageNumber: string): Observable<QuizResultPageModel> {
    let params = new HttpParams();
    params = params.append('pageSize', pageSize);
    params = params.append('pageNumber', pageNumber);
    return this.httpClient.get<QuizResultPageModel>(environment.baseUrl + this.result + this.quiz + id
      , { params });
  }
}
