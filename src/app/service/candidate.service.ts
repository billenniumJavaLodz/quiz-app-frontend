import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CandidateModel} from '../models/candidate-model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  candidateUrl = 'candidate/';
  candidateEmail = '/email';

  constructor(private httpClient: HttpClient) {
  }

  getUser(userId: string): Observable<CandidateModel> {
    return this.httpClient.get<CandidateModel>(environment.baseUrl + this.candidateUrl + userId + this.candidateEmail);
  }
}
