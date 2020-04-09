import {Component, OnInit} from '@angular/core';
import {QuizDefinitionModel} from 'src/app/models/quiz-definition-model';

import {AnswerDto} from '../../models/answer-dto';
import {AnswerModel} from '../../models/answer-model';


@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss']
})
export class QuizPageComponent implements OnInit {

  quizModel: QuizDefinitionModel;
  selectedAnswer = new AnswerModel();
  answerToSend = new AnswerDto();


  constructor() {
  }

  ngOnInit(): void {
  }


  select(item: AnswerModel) {
    this.selectedAnswer = item;
  }

  submit() {
    this.answerToSend.id = this.quizModel.id;
    this.answerToSend.questionId = this.quizModel.question.id;
    this.answerToSend.answer = this.selectedAnswer;
    //todo submit answer and move to quiz page
  }
}
