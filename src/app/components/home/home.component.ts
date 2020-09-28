import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { finalize, switchMap, take, tap } from 'rxjs/operators';
import { UserService } from '../../shared/services/user.service';
import { UserData } from '../../models/user-data';
import { Project } from '../../models/gitlab';
import { Repository } from '../../models/github';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: UserData = { email: null };
  projects: Project[];
  repos: Repository[];
  loaded: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.get()
      .pipe(
        switchMap(data => {
          this.user = data;

          if (this.user.idp === 'gitlab') {
            return this.userService.getProjects().pipe(tap(projects => this.projects = projects));
          } else if (this.user.idp === 'github') {
            return this.userService.getRepos().pipe(tap(repos => this.repos = repos));
          } else {
            return of([]);
          }
        }),
        take(1),
        finalize(() => {
          this.loaded = true;
        })
      )
      .subscribe(
        () => {},
        error => {
          console.log(error);
        }
      );
  }

  logout() {
    location.replace('/logout');
  }
}
