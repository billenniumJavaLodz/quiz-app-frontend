import {Component, OnInit} from '@angular/core';
import {QuizDefinitionModel} from 'src/app/models/quiz-definition-model';

import {AnswerDto} from '../../models/answer-dto';
import {AnswerModel} from '../../models/answer-model';
import {QuizService} from "../../service/quiz.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss']
})
export class QuizPageComponent implements OnInit {

  SESSION_STORAGE_USER_ID = 'BILLENNIUM_CANDIDATE_ID';

  response: QuizDefinitionModel;
  selectedAnswer = new AnswerModel();
  request = new AnswerDto();


  constructor(private quizService: QuizService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.prepareInitRequestBody();
    this.quizService.saveAndLoadQuestions(sessionStorage.getItem(this.SESSION_STORAGE_USER_ID), this.request)
      .subscribe(data => {
        this.response = data;
      });
  }


  select(item: AnswerModel) {
    this.selectedAnswer = item;
  }

  prepareInitRequestBody() {
    this.request.answerId = null;
    this.request.questionId = null;
  }

  submit() {
    this.request.questionId = this.response.question.id;
    this.request.answerId = this.selectedAnswer.id;

    this.quizService.saveAndLoadQuestions(sessionStorage.getItem(this.SESSION_STORAGE_USER_ID), this.request).subscribe(data => {
      this.selectedAnswer = new AnswerModel();
      this.response = data;
      if (this.response.id === null) {
        this.router.navigate(['thank-you']);
      }
    });
  }
}
