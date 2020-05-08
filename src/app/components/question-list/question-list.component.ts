import { Component, OnInit, SecurityContext } from '@angular/core';
import { QuestionDetailsModel } from 'src/app/models/question-detiails-model';
import { QuestionService } from 'src/app/service/question.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  DEFAULT_PAGE_SIZE = 20;
  MIN_BUUTON_GROUPING = 3;
  DEFAULT_PAGE_NUMBER = 0;
  totalElements: number = 0;
  pageSize = this.DEFAULT_PAGE_SIZE;
  pageNumber = this.DEFAULT_PAGE_NUMBER;
  totalPages = Math.ceil(this.totalElements / this.pageSize);
  dataSource: QuestionDetailsModel[];
  preTagContent= "[...]"


  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.getQuestionPage(this.pageSize, this.pageNumber);
  }

  getQuestionPage(pageSize: number, pageNumber: number) {

    this.questionService.getQuestionPage(pageSize, pageNumber).subscribe(data => {

      this.totalElements = data.totalElements;
      this.pageNumber = data.pageNumber;
      this.totalPages = Math.ceil(this.totalElements / this.pageSize);

      data.questions.sort(function (questionA, questionB) {
        return questionA.id - questionB.id;
      });

      data.questions.forEach(question => {
        if (question.text.includes("pre"))
          question.text = this.preTagReplacer(question.text);
      })

      this.dataSource = data.questions;
      window.scrollTo(0, 0);
    });
  }

  goToPage(page: number) {
    this.getQuestionPage(this.pageSize, this.checkPageNumeber(page));
  }

  checkPageNumeber(page: number): number {
    let dataBaseTotalPages = this.totalPages - 1;

    if (page >= this.totalPages) {
      page = dataBaseTotalPages;
    }

    if (page < this.DEFAULT_PAGE_NUMBER) {
      page = this.DEFAULT_PAGE_NUMBER;
    }

    return page;
  }

  pagesButton() {
    let dataBaseTotalPages = this.totalPages - 1;

    if (this.totalPages <= this.MIN_BUUTON_GROUPING) {
      return this.createButtonArray(this.DEFAULT_PAGE_NUMBER, dataBaseTotalPages);
    } else {
      if (this.pageNumber === this.DEFAULT_PAGE_NUMBER) {
        let thirdQuestion = this.pageNumber + 2;
        return this.createButtonArray(this.DEFAULT_PAGE_NUMBER, thirdQuestion);
      } else if (this.pageNumber === dataBaseTotalPages) {
        return this.createButtonArray(this.totalPages - this.MIN_BUUTON_GROUPING, dataBaseTotalPages);
      } else {
        let pageBefore = this.pageNumber - 1;
        let nextPage = this.pageNumber + 1;

        return this.createButtonArray(pageBefore, nextPage);
      }
    }
  }

  createButtonArray(buttonIdStart: number, buttonIdStop: number) {
    let array = [];
    for (let id = buttonIdStart; id <= buttonIdStop; id++) {
      array.push(id);
    }
    return array;
  }

  preTagReplacer(baseHtml: string) {
    let questionHtml = document.createElement("div");
    questionHtml.innerHTML = baseHtml;

    for (let pre = 0; pre < questionHtml.getElementsByTagName("pre").length; pre++) {
      questionHtml.getElementsByTagName("pre")[pre]
        .innerHTML = this.preTagContent;

    }
    return questionHtml.innerHTML;
  }
}
