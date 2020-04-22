import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResultModel} from "../models/result.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  result = 'result/';

  constructor(private httpClient: HttpClient) {
  }

  getCandidateResult(id: string): Observable<ResultModel> {
    return this.httpClient.get<ResultModel>(environment.baseUrl + this.result + id);
  }
}
