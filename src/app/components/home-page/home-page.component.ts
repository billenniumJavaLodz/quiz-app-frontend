import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from '../../service/candidate.service';
import { CandidateModel } from '../../models/candidate-model';
import { SessionStorageService } from '../../service/session.storage.service';
import { ResultModel } from '../../models/result.model';
import { ResultService } from '../../service/result.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  QUIZ_READY_STATUS = 'READY';
  QUIZ_DONE_STATUS = 'DONE';
  DEFAULT_TIMER = 0;
  userId: string;
  user: CandidateModel;
  result: ResultModel;
  score: number;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private candidateService: CandidateService,
    private sessionStorageService: SessionStorageService,
    private resultService: ResultService) {
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.candidateService.getUser(this.userId).subscribe(data => {
      this.user = data;
      this.sessionStorageService.setUUID(this.user.id);
      this.sessionStorageService.setQuizStatus(this.user.quizStatus);
      this.sessionStorageService.setTimer(this.DEFAULT_TIMER);
      this.sessionStorageService.setQuestion(null);
      if (this.sessionStorageService.getQuizStatus() === this.QUIZ_DONE_STATUS) {
        this.resultService.getCandidateResult(this.user.id).subscribe(resultData => {
          this.result = resultData;
          this.score = Math.round((this.result.scoredPoints / this.result.totalPoints) * 100);
        });
      }
    });
  }
}
