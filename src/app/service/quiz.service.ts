import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {QuizDefinitionModel} from "../models/quiz-definition-model";
import {environment} from "../../environments/environment";
import {AnswerDto} from "../models/answer-dto";
import {EndQuizModel} from "../models/end.quiz.model";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  quiz = 'quiz/';
  stopQuiz = 'stop';

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
}
