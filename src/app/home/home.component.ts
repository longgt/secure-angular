import { Component, OnInit } from '@angular/core';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../user.service';
import { UserData } from '../models/user-data';
import { Project } from '../models/gitlab';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: UserData = { email: null };
  projects: Project[];
  loaded: boolean = false;

  constructor(private userService: UserService ) {

  }

  ngOnInit(): void {
    this.userService.get().pipe(finalize(() => {
      this.loaded = true;
    }),
    tap(data => this.user = data),
    switchMap(() => {
      return this.userService.getProjects();
    })).subscribe(projects => {
      this.projects = projects;
    }, error => {
      console.log(error);
    });
  }
}
