import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CandidateModel} from '../models/candidate-model';
import {environment} from '../../environments/environment';
import { CandidateSaveModel } from '../models/candidate-save-model';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private candidateUrl = 'candidate/';
  private candidateEmail = '/email';

  constructor(private httpClient: HttpClient) {
  }

  getUser(userId: string): Observable<CandidateModel> {
    return this.httpClient.get<CandidateModel>(environment.baseUrl + this.candidateUrl + userId + this.candidateEmail);
  }
  saveUser(candidate:CandidateSaveModel):Observable<string>{
    return this.httpClient.post<string>(environment.baseUrl + this.candidateUrl,candidate);
  }
}
