import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/service/question.service';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionDetailsModel } from 'src/app/models/question-detiails-model';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent implements OnInit {

  constructor(private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {

  }

  question: QuestionDetailsModel;

  DELTE_SUCCESS = "Pomyślnie usnięto";

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
    this.questionService.deleteQuestion(this.question.id).subscribe(data => {
      this.snackBarOpen(this.DELTE_SUCCESS)
    }, error => {
      this.snackBarOpen(error.error.message);
    });
  }


  snackBarOpen(data: string) {
    this.snackBar.open(data, "Zamknij", {
      duration: 5000,
    }).afterDismissed().subscribe(dissmis => {
      if (data === this.DELTE_SUCCESS) {
        this.router.navigateByUrl('/question');
      }
    });

  }
  editQuestion() {
    this.router.navigateByUrl('question/edit/' + this.question.id);
  }
}

