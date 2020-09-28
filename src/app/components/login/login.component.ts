import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserData } from '../../models/user-data';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class SsoLoginComponent implements OnInit {
  user: UserData = { email: null };
  
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.get().pipe(take(1)).subscribe(data => {
      if (data.preferred_username) {
        this.router.navigateByUrl('/welcome');
      }
    }, error => {
      console.log('login', error);
    });
  }
}
