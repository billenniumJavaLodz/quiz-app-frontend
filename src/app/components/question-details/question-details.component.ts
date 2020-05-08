import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/service/question.service';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionDetailsModel } from 'src/app/models/question-detiails-model';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent implements OnInit {

  constructor(private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute) { }

  question: QuestionDetailsModel;

  ngOnInit(): void {
    this.initQuestion();
    this.getQuestion();

  }
  initQuestion() {
    this.question = new QuestionDetailsModel();
  }

  getQuestion() {
    this.questionService.getQuestion(Number(this.route.snapshot.paramMap.get('id'))).subscribe(data => {
      this.question = data;
    });
  }
  deleteQuestion() {
    //todo deleting question with angaular material  trash icon in html
  }
  editQuestion() {
    //todo create reusable component to editing question
  }
}

