import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { QuizDefinitionModel } from "../models/quiz-definition-model";
import { environment } from "../../environments/environment";
import { AnswerDto } from "../models/answer-dto";
import { EndQuizModel } from "../models/end.quiz.model";
import { QuizSaveModel } from '../models/quiz-save-model';
import { QuizPageModel } from '../models/quiz-page-model';
import { QuizDetailsModel } from '../models/quiz-details-model';
import { CategoryModel } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quiz = 'quiz/';
  private category = 'category'
  private stopQuiz = 'stop';


  constructor(public httpClient: HttpClient) {
  }

  saveAndLoadQuestions(userId: string, dto: AnswerDto): Observable<QuizDefinitionModel> {
    return this.httpClient.post<QuizDefinitionModel>(environment.baseUrl + this.quiz + userId, dto);
  }


  endQuiz(id: number) {
    const endQuizModel = new EndQuizModel();
    endQuizModel.quizId = id;
    return this.httpClient.post(environment.baseUrl + this.quiz + this.stopQuiz, endQuizModel).subscribe();
  }

  createQuiz(quiz: QuizSaveModel): Observable<number> {
    return this.httpClient.post<number>(environment.baseUrl + this.quiz, quiz);
  }

  getQuizzes(pageSize: string, pageNumber: string, category: string): Observable<QuizPageModel> {
    let params = new HttpParams();
    params = params.append('pageSize', pageSize);
    params = params.append('pageNumber', pageNumber);
    params = params.append('category', category)
    return this.httpClient.get<QuizPageModel>(environment.baseUrl + this.quiz, { params: params });
  }

  getQuiz(id: number): Observable<QuizDetailsModel> {
    return this.httpClient.get<QuizDetailsModel>(environment.baseUrl + this.quiz + id);
  }

  getCategories(): Observable<CategoryModel[]> {
    return this.httpClient.get<CategoryModel[]>(environment.baseUrl + this.quiz + this.category);
  }
}
