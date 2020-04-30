import { Component, OnInit } from '@angular/core';
import { QuestionModel } from 'src/app/models/question-model';
import { QuestionService } from 'src/app/service/question.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent implements OnInit {

  constructor(private questionService: QuestionService,
              private router: Router,
              private route: ActivatedRoute) { }

   question: QuestionModel;

  ngOnInit(): void {
      this.initQuestion();
      this.getQuestion();

  }
  initQuestion(){
    this.question = new QuestionModel();
  }

  getQuestion(){
    this.questionService.getQuestion(Number(this.route.snapshot.paramMap.get('id'))).subscribe(data=>{
      this.question = data;
    });

  }
}
