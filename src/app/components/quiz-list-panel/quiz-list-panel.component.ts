import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuizModel } from 'src/app/models/quiz-model';

@Component({
  selector: 'app-quiz-list-panel',
  templateUrl: './quiz-list-panel.component.html',
  styleUrls: ['./quiz-list-panel.component.scss']
})
export class QuizListPanelComponent implements OnInit {

  @Input() dataSource: QuizModel[];
  @Input() isCandidateQuizButtonsEnabled: boolean;
  @Input() selectedQuiz: QuizModel;
  @Output() quizEmitter = new EventEmitter<QuizModel>();
  isExpand: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  setQuiz(quiz: QuizModel) {
    this.isExpand = true;
    this.selectedQuiz = quiz;
    this.quizEmitter.emit(quiz);
  }
}
