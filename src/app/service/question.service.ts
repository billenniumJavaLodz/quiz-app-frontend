import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuestionToSaveModel } from '../models/question-to-save-model';
import {QuestionModel} from '../models/question-model'
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private httpClient: HttpClient) { }

  questionUrl = '/question/';

  addQuestion(question: QuestionToSaveModel):Observable<number> {
     return this.httpClient.post<number>(environment.baseUrl + this.questionUrl, question);
  }

  getQuestion(id: number):Observable<QuestionModel> {
      return this.httpClient.get<QuestionModel>(environment.baseUrl + this.questionUrl + id);
  }
}
