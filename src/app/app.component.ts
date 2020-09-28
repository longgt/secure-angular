import { Component, OnInit } from '@angular/core';
import { UserData } from './models/user-data';
import { UserService } from './shared/services/user.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string;
  isCollapsed = false;
  user: UserData;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.userService
      .get()
      .pipe(take(1))
      .subscribe((data) => {
        this.user = data;
      });
  }

  login(): Promise<boolean> {
    return this.router.navigate(['/login']);
  }

  profile(): Promise<boolean> {
    return this.router.navigate(['/profile']);
  }

  logout(): void {
    location.replace('/logout');
  }
}
