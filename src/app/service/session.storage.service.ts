import {Injectable} from '@angular/core';
import {QuizDefinitionModel} from "../models/quiz-definition-model";

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  SESSION_STORAGE_TIMER = 'CANDIDATE_TIMER';
  SESSION_STORAGE_QUIZ = 'CANDIDATE_QUIZ';
  SESSION_STORAGE_USER_ID = 'BILLENNIUM_CANDIDATE_ID';
  SESSION_STORAGE_QUIZ_STATUS = 'CANDIDATE_QUIZ_STATUS';

  setTimer(timerValue: number) {
    sessionStorage.setItem(this.SESSION_STORAGE_TIMER, String(timerValue));
  }

  getTimer(): number {
    return Number(sessionStorage.getItem(this.SESSION_STORAGE_TIMER));
  }

  getQuestion(): QuizDefinitionModel {
    return JSON.parse(sessionStorage.getItem(this.SESSION_STORAGE_QUIZ));
  }

  setQuestion(question: QuizDefinitionModel) {
    sessionStorage.setItem(this.SESSION_STORAGE_QUIZ, JSON.stringify(question));
  }

  setUUID(id: string) {
    sessionStorage.setItem(this.SESSION_STORAGE_USER_ID, id);
  }

  getUUID() {
    return sessionStorage.getItem(this.SESSION_STORAGE_USER_ID);
  }

  clearStorage() {
    sessionStorage.clear();
  }


  setQuizStatus(quizStatus: string) {
    sessionStorage.setItem(this.SESSION_STORAGE_QUIZ_STATUS, quizStatus);
  }

  getQuizStatus() {
    return sessionStorage.getItem(this.SESSION_STORAGE_QUIZ_STATUS);
  }
}
