import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CandidateService} from "../../service/candidate.service";
import {CandidateModel} from "../../models/candidate-model";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  userId: string;
  user: CandidateModel;

  constructor(private route: ActivatedRoute, private  candidateService: CandidateService) {
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.candidateService.getUser(this.userId).subscribe(data => {
      this.user = data;
      sessionStorage.setItem('BILLENNIUM_CANDIDATE_ID', this.user.id);
    });
  }

  startQuiz() {

  }
}
