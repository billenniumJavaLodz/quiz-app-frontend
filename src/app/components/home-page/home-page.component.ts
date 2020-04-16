import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CandidateService} from '../../service/candidate.service';
import {CandidateModel} from '../../models/candidate-model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  SESSION_STORAGE_USER_ID = 'BILLENNIUM_CANDIDATE_ID';
  userId: string;
  user: CandidateModel;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private  candidateService: CandidateService) {
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.candidateService.getUser(this.userId).subscribe(data => {
      this.user = data;
      sessionStorage.setItem(this.SESSION_STORAGE_USER_ID, this.user.id);
    });
  }
}
