import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../service/user.service";
import {UserModel} from "../../models/user-model";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  userId: string;
  user: UserModel;

  constructor(private route: ActivatedRoute, private  userService: UserService) {
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get("id");
    this.userService.getUser(this.userId).subscribe(data => {
      this.user = data;
    });
  }
}
