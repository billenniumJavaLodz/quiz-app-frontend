import { Component, OnInit } from '@angular/core';

import { LoaderService } from 'src/app/service/loader.service';
import { Subject  } from 'rxjs';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  isLoading: Subject <boolean> = this.loaderService.isLoading;
  mode = 'indeterminate';
  constructor(private loaderService: LoaderService) {
  }


  ngOnInit(): void {
  }

}
