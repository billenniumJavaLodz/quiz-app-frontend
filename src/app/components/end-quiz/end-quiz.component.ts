import { Component, OnInit } from '@angular/core';
import { ResultService } from '../../service/result.service';
import { SessionStorageService } from '../../service/session.storage.service';
import { ResultModel } from '../../models/result.model';
import { Router } from "@angular/router";

@Component({
  selector: 'app-end-quiz',
  templateUrl: './end-quiz.component.html',
  styleUrls: ['./end-quiz.component.scss']
})
export class EndQuizComponent implements OnInit {

  result: ResultModel;
  score: number;

  constructor(private resultService: ResultService,
    private sessionStorageService: SessionStorageService,
    private router: Router) {
  }

  ngOnInit(): void {
    if (this.sessionStorageService.getUUID() === null) {
      this.router.navigate(['']);
    }
    this.resultService.getCandidateResult(this.sessionStorageService.getUUID()).subscribe(data => {
      this.result = data;
      this.score = Math.round((this.result.scoredPoints / this.result.totalPoints) * 100);
    });
  }
}
