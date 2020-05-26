import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  DEFAULT_CATEGORY = "ALL";
  @Input() categories: CategoryModel[];
  @Output() categoryEmmiter = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  onCategoryChange($event: MatSelectChange) {
    if ($event.value === undefined) {
      this.categoryEmmiter.emit(this.DEFAULT_CATEGORY);
    } else {
      this.categoryEmmiter.emit($event.value);
    }
  }
}
