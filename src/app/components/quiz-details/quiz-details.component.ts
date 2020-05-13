import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/service/quiz.service';
import { QuizDetailsModel } from 'src/app/models/quiz-details-model';
import { ActivatedRoute } from '@angular/router';
import { ParserService } from 'src/app/service/parser.service';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss']
})
export class QuizDetailsComponent implements OnInit {

  quiz: QuizDetailsModel;

  constructor(private quizService: QuizService,
    private route: ActivatedRoute,
    private parserService: ParserService) { }


  ngOnInit(): void {
    this.getQuiz();
  }

  getQuiz() {
    this.quizService.getQuiz(Number(this.route.snapshot.paramMap.get('id'))).subscribe(data => {
      this.quiz = data;

      this.quiz.questions.forEach(question => {
        if (question.text.includes("pre"))
          question.text = this.parserService.preTagReplacer(question.text);
      })
    });
  }


}
