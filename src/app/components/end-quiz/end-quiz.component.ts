import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-end-quiz',
  templateUrl: './end-quiz.component.html',
  styleUrls: ['./end-quiz.component.scss']
})
export class EndQuizComponent implements OnInit {
  SESSION_STORAGE_USER_ID = 'BILLENNIUM_CANDIDATE_ID';

  constructor() {
  }

  ngOnInit(): void {
    sessionStorage.setItem(this.SESSION_STORAGE_USER_ID, '');
  }

}
