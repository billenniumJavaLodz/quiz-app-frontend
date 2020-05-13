import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page-navigation',
  templateUrl: './page-navigation.component.html',
  styleUrls: ['./page-navigation.component.scss']
})
export class PageNavigationComponent implements OnInit {

  constructor() { }

  @Input() totalPages: number = 0;
  @Input() pageNumber: number = 0;
  @Output() changePageEmitter = new EventEmitter<number>();
  pageFrontNumber: number = this.pageNumber + 1;
  BUUTON_GROUPING = 3;
  DEFAULT_PAGE_NUMBER = 0;

  ngOnInit(): void {

  }

  pagesButton() {
    let dataBaseTotalPages = this.totalPages - 1;

    if (this.totalPages <= this.BUUTON_GROUPING) {
      return this.createButtonArray(this.DEFAULT_PAGE_NUMBER, dataBaseTotalPages);
    } else {
      if (this.pageNumber === this.DEFAULT_PAGE_NUMBER) {
        let thirdQuestion = this.pageNumber + 2;
        return this.createButtonArray(this.DEFAULT_PAGE_NUMBER, thirdQuestion);
      } else if (this.pageNumber === dataBaseTotalPages) {
        return this.createButtonArray(this.totalPages - this.BUUTON_GROUPING, dataBaseTotalPages);
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

  goToPage(pageNumber: number) {
    pageNumber = this.checkPageNumber(pageNumber);
    this.changePageEmitter.emit(pageNumber);
  }

  checkPageNumber(page: number): number {
    let dataBaseTotalPages = this.totalPages - 1;

    if (page >= this.totalPages) {
      this.pageFrontNumber = this.totalPages;
      page = dataBaseTotalPages;
    }

    if (page < this.DEFAULT_PAGE_NUMBER) {
      this.pageFrontNumber = this.DEFAULT_PAGE_NUMBER + 1;
      page = this.DEFAULT_PAGE_NUMBER;
    }

    return page;
  }
}
