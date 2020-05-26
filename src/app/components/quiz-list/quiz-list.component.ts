import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/service/quiz.service';
import { QuizModel } from 'src/app/models/quiz-model';
import { CategoryModel } from 'src/app/models/category.model';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  DEFAULT_PAGE_SIZE = 10;
  MIN_BUUTON_GROUPING = 3;
  DEFAULT_PAGE_NUMBER = 0;
  category = "ALL";
  totalElements: number = 0;
  pageSize = this.DEFAULT_PAGE_SIZE;
  pageNumber = this.DEFAULT_PAGE_NUMBER;
  totalPages = Math.ceil(this.totalElements / this.pageSize);
  dataSource: QuizModel[];
  categories: CategoryModel[];
  message: string

  constructor(private quizService: QuizService) { }


  ngOnInit(): void {
    this.getQuizzes(this.pageSize, this.pageNumber, this.category);
    this.getCategories();
  }
  getQuizzes(pageSize: number, pageNumber: number, category: string) {
    this.quizService.getQuizzes(String(pageSize), String(pageNumber), category).subscribe(data => {

      this.totalElements = data.totalElements;
      this.pageNumber = data.pageNumber;
      this.totalPages = Math.ceil(this.totalElements / this.pageSize);
      this.dataSource = data.quizzes;
    });
    window.scrollTo(0, 0);
  }

  getCategories() {
    this.quizService.getCategories().subscribe(data => {
      this.categories = data;
    })
  }


  goToPage($pageNumber: number) {
    this.pageNumber = $pageNumber;
    this.getQuizzes(this.pageSize, this.pageNumber, this.category);
  }
  getCategory(category: string) {
    this.pageSize = this.DEFAULT_PAGE_SIZE;
    this.pageNumber = this.DEFAULT_PAGE_NUMBER;
    this.category = category;
    this.getQuizzes(this.pageSize, this.pageNumber, this.category);
  }
}
