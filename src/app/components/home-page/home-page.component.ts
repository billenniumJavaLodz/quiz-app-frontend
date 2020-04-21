import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CandidateService} from '../../service/candidate.service';
import {CandidateModel} from '../../models/candidate-model';
import {SessionStorageService} from '../../service/session.storage.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  QUIZ_READY_STATUS = 'READY';
  DEFAULT_TIMER = -1;
  userId: string;
  user: CandidateModel;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private  candidateService: CandidateService,
              private sessionStorageService: SessionStorageService) {
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.candidateService.getUser(this.userId).subscribe(data => {
      this.user = data;
      this.sessionStorageService.setUUID(this.user.id);
      this.sessionStorageService.setTimer(this.DEFAULT_TIMER);
      this.sessionStorageService.setQuestion(null);
    });
  }
}
