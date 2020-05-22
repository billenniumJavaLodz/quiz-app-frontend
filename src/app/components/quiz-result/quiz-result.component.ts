import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/service/quiz.service';
import { ResultService } from 'src/app/service/result.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizModel } from 'src/app/models/quiz-model';
import { CandidateResultModel } from 'src/app/models/candidate-result-model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss']
})
export class QuizResultComponent implements OnInit {

  constructor(private quizService: QuizService,
    private resultService: ResultService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private clipboard: Clipboard) { }

  DEFAULT_PAGE_SIZE = 10;
  MIN_BUUTON_GROUPING = 3;
  DEFAULT_PAGE_NUMBER = 0;
  totalElements: number = 0;
  pageSize = this.DEFAULT_PAGE_SIZE;
  pageNumber = this.DEFAULT_PAGE_NUMBER;
  totalPages = Math.ceil(this.totalElements / this.pageSize);

  quiz: QuizModel;
  candidatesArray: CandidateResultModel[];


  displayColumns: string[] = ['email', 'score', 'scoredPoints']
  dataSource = new MatTableDataSource();

  ngOnInit(): void {
    this.getQuiz();
    this.getResultPage(this.pageSize, this.pageNumber);
  }

  getQuiz() {
    this.quizService.getQuiz(this.getPath()).subscribe(data => {
      this.quiz = data;
    })
  }

  getResultPage(pageSize: number, pageNumber: number) {
    this.resultService.getQuizResultPage(this.getPath(), String(pageSize), String(pageNumber)).subscribe(data => {
      this.pageNumber = data.pageNumber;
      this.pageSize = data.pageSize;
      this.totalElements = data.totalElements;
      this.candidatesArray = data.candidateResults;
      this.totalPages = Math.ceil(this.totalElements / this.pageSize);
      this.dataSource = new MatTableDataSource(this.candidatesArray);
    })
  }

  getPath() {
    return Number(this.route.snapshot.paramMap.get('id'));
  }

  goToPage($pageNumber: number) {
    this.pageNumber = $pageNumber;
    this.getResultPage(this.pageSize, this.pageNumber);
  }

  copyToClipboard(email: string) {
    this.clipboard.copy(email);
    this.snackBar.open("Skopiowano adres email.", "Zamknij", {
      duration: 1000
    })
  }
  goBack() {
    this.router.navigate(['/quiz/' + this.quiz.id], { replaceUrl: true });
  }

}
