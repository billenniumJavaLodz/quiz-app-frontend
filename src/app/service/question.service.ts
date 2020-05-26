import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { QuestionToSaveModel } from '../models/question-to-save-model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { QuestionDetailsModel } from '../models/question-detiails-model';
import { QuestionPageModel } from '../models/question-page-model';
import { QuestionToUpdateModel } from '../models/question-to-update-model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private httpClient: HttpClient) { }

  private questionUrl = '/question/';


  addQuestion(question: QuestionToSaveModel): Observable<number> {
    return this.httpClient.post<number>(environment.baseUrl + this.questionUrl, question);
  }

  getQuestion(id: number): Observable<QuestionDetailsModel> {
    return this.httpClient.get<QuestionDetailsModel>(environment.baseUrl + this.questionUrl + id);
  }

  getQuestionPage(pageSize: string, pageNumber: string): Observable<QuestionPageModel> {
    let params = new HttpParams();
    params = params.append('pageSize', pageSize);
    params = params.append('pageNumber', pageNumber);

    return this.httpClient.get<QuestionPageModel>(environment.baseUrl + this.questionUrl, { params: params });
  }

  deleteQuestion(id: number): Observable<any> {
    return this.httpClient.delete<any>(environment.baseUrl + this.questionUrl + id);
  }

  updateQuestion(question: QuestionToUpdateModel): Observable<any> {
    return this.httpClient.put<any>(environment.baseUrl + this.questionUrl, question);
  }

}
