import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { UserService } from '../user.service';
import { UserData } from '../models/user-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: UserData = { email: null };
  loaded: boolean = false;

  constructor(private userService: UserService ) {

  }

  ngOnInit(): void {
    this.userService.get().pipe(finalize(() => {
      this.loaded = true;
    })).subscribe(data => {
      this.user = data;
    }, error => {
      console.log(error);
    });
  }
}
