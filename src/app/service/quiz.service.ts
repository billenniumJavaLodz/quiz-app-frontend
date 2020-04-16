import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {QuizDefinitionModel} from "../models/quiz-definition-model";
import {environment} from "../../environments/environment";
import {AnswerDto} from "../models/answer-dto";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  quiz = '/quiz/';

  constructor(public httpClient: HttpClient) {
  }

  saveAndLoadQuestions(userId: string, dto: AnswerDto): Observable<QuizDefinitionModel> {
    return this.httpClient.post<QuizDefinitionModel>(environment.baseUrl + this.quiz + userId, dto);
  }


}
