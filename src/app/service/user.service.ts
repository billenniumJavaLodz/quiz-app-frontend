import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from "../models/user-model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl = "user/";

  constructor(private httpClient: HttpClient) {
  }

  getUser(userId: string): Observable<UserModel> {
    return this.httpClient.get<UserModel>(environment.baseUrl + this.userUrl + userId);
  }

}
