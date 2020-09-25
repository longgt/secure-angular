import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../../models/user-data';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: UserData = { email: null };
  
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.get().subscribe(data => {
      console.log('Login', data);
      if (data.preferred_username) {
        this.router.navigateByUrl('/home');
      }
    }, error => {
      console.log(error);
    });
  }
}
