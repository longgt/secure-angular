import { Component, OnInit } from '@angular/core';
import { finalize, switchMap, take } from 'rxjs/operators';
import { UserService } from '../../shared/services/user.service';
import { UserData } from '../../models/user-data';
import { Project } from '../../models/gitlab';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: UserData = { email: null };
  projects: Project[];
  loaded: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.get()
      .pipe(
        switchMap((data) => {
          this.user = data;
          return this.userService.getProjects();
        }),
        take(1),
        finalize(() => {
          this.loaded = true;
        })
      )
      .subscribe(
        projects => {
          this.projects = projects;
        },
        error => {
          console.log(error);
        }
      );
  }
}
