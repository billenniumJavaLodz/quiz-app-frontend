import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/service/quiz.service';
import { QuizModel } from 'src/app/models/quiz-model';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  DEFAULT_PAGE_SIZE = 10;
  MIN_BUUTON_GROUPING = 3;
  DEFAULT_PAGE_NUMBER = 0;
  totalElements: number = 0;
  pageSize = this.DEFAULT_PAGE_SIZE;
  pageNumber = this.DEFAULT_PAGE_NUMBER;
  totalPages = Math.ceil(this.totalElements / this.pageSize);
  dataSource: QuizModel[];
  message: string

  constructor(private quizService: QuizService) { }


  ngOnInit(): void {
    this.getQuizzes(this.pageSize, this.pageNumber);
  }
  getQuizzes(pageSize: number, pageNumber: number) {
    this.quizService.getQuizzes(pageSize, pageNumber).subscribe(data => {

      this.totalElements = data.totalElements;
      this.pageNumber = data.pageNumber;
      this.totalPages = Math.ceil(this.totalElements / this.pageSize);
      this.dataSource = data.quizzes;
    });
    window.scrollTo(0, 0);
  }

  goToPage($pageNumber: number) {
    this.pageNumber = $pageNumber;
    this.getQuizzes(this.pageSize, this.pageNumber);
  }

}
