import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuizDefinitionModel } from 'src/app/models/quiz-definition-model';
import { AnswerDto } from '../../models/answer-dto';
import { AnswerModel } from '../../models/answer-model';
import { QuizService } from '../../service/quiz.service';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { SessionStorageService } from '../../service/session.storage.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss']
})
export class QuizPageComponent implements OnInit, OnDestroy {
  ANSWER_TIME_OUT = 0;
  QUIZ_READY_STATUS = 'READY';
  response: QuizDefinitionModel;
  selectedAnswer = new AnswerModel();
  request = new AnswerDto();
  timeToAnswer: number;
  timer: Subscription;

  constructor(private quizService: QuizService,
    private router: Router,
    private sessionStorageService: SessionStorageService) {
  }


  ngOnInit(): void {
    this.timeToAnswer = this.sessionStorageService.getTimer();
    if (this.sessionStorageService.getQuestion() === null && this.sessionStorageService.getQuizStatus() === this.QUIZ_READY_STATUS) {
      this.sendData(null, null);
    } else {
      this.response = this.sessionStorageService.getQuestion();
      this.runTimer();
    }
  }

  stopTimer() {
    this.timer.unsubscribe();
  }

  select(item: AnswerModel) {
    this.selectedAnswer = item;
  }

  submit(questionId: number, answerId: number) {
    this.stopTimer();
    this.sendData(questionId, answerId);
  }

  ngOnDestroy(): void {
    if (this.response.id !== null) {
      this.quizService.endQuiz(this.response.id);
    }
    this.stopTimer();
  }

  isResponseDefined(): boolean {
    return this.response !== undefined;
  }

  private runTimer() {
    this.timer = interval(1000).subscribe(counter => {
      if (this.timeToAnswer === 0) {
        this.stopTimer();
        if (this.selectedAnswer.id === undefined) {
          this.sendData(this.response.question.id, this.ANSWER_TIME_OUT);
        } else {
          this.sendData(this.response.question.id, this.selectedAnswer.id);
        }
      } else {
        this.timeToAnswer--;
        this.sessionStorageService.setTimer(this.timeToAnswer);
      }
    });
  }

  private sendData(questionId: number, answerId: number) {
    this.request.questionId = questionId;
    this.request.answerId = answerId;

    this.quizService.saveAndLoadQuestions(this.sessionStorageService.getUUID(), this.request).subscribe(data => {
      this.selectedAnswer = new AnswerModel();
      this.response = data;

      this.sessionStorageService.setQuestion(this.response);
      if (this.response.id === null) {
        this.router.navigate(['thank-you']);
      }
      this.timeToAnswer = data.question.timeToAnswer;
      this.runTimer();
    });
  }
}
