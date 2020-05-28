import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/service/quiz.service';
import { QuizDetailsModel } from 'src/app/models/quiz-details-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ParserService } from 'src/app/service/parser.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss']
})
export class QuizDetailsComponent implements OnInit {

  quiz: QuizDetailsModel;
  DELETE_SUCCESS = "Pomyślnie usnięto";

  constructor(private quizService: QuizService,
    private route: ActivatedRoute,
    private parserService: ParserService,
    private location: Location,
    private router: Router,
    private snackBar: MatSnackBar) { }


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

  back() {
    this.location.subscribe(
      (path => {
        if (path.url === this.router.url) {
          this.location.back();
        }
      }));
    this.location.back();
  }

  deleteQuiz() {
    this.quizService.deleteQuiz(this.quiz.id).subscribe(data => {
      this.snackBarOpen(this.DELETE_SUCCESS)
    }, error => {
      this.snackBarOpen(error.error.message);
    });
  }


  snackBarOpen(data: string) {
    this.snackBar.open(data, "Zamknij", {
      duration: 5000,
    }).afterDismissed().subscribe(dissmis => {
      if (data === this.DELETE_SUCCESS) {
        this.router.navigateByUrl('/quiz');
      }
    });
  }
}
