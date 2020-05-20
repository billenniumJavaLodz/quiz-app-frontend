import { Injectable } from '@angular/core';
import { QuizDefinitionModel } from "../models/quiz-definition-model";
import { CandidateModel } from '../models/candidate-model';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  private SESSION_STORAGE_TIMER = 'CANDIDATE_TIMER';
  private SESSION_STORAGE_QUIZ = 'CANDIDATE_QUIZ';
  private SESSION_STORAGE_USER_ID = 'BILLENNIUM_CANDIDATE_ID';
  private SESSION_STORAGE_QUIZ_STATUS = 'CANDIDATE_QUIZ_STATUS';
  private SESSION_STORAGE_CANDIDATES = "SAVED_CANDIDATES_ARRAY"

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

  setSavedCandidates(candidates: CandidateModel[]) {
    sessionStorage.setItem(this.SESSION_STORAGE_CANDIDATES, JSON.stringify(candidates))
  }

  getSavedCandidates() {
    return sessionStorage.getItem(this.SESSION_STORAGE_CANDIDATES);
  }
}
