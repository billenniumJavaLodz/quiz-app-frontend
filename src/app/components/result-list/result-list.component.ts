import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ResultService} from "../../service/result.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import { CandidateResultModel } from 'src/app/models/candidate-result-model';

@Component({
  selector: 'app-candidate-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {
  displayedColumns = ['id', 'email', 'quizTitle', 'scoredPoints', 'totalPoints'];
  tableData: MatTableDataSource<CandidateResultModel>;
  response: CandidateResultModel[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private resultService: ResultService) {
  }

  ngOnInit(): void {

    this.resultService.getResults().subscribe(data => {
      this.response = data;
      this.tableData = new MatTableDataSource<CandidateResultModel>(this.response);
      this.tableData.sort= this.sort;
      this.tableData.paginator = this.paginator;

      this.tableData.filterPredicate = function(data, filter: string): boolean {
          return data.id.toLowerCase().includes(filter) || data.email.toLowerCase().includes(filter) || data.quizTitle.toString().includes(filter);
      };
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.tableData.filter = filterValue;
  }

}

