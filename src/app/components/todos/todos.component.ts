import { Component, OnInit } from '@angular/core';
import { take, finalize } from 'rxjs/operators';
import { UserService } from '../../shared/services/user.service';
import { GitLabTodo } from '../../models/gitlab';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos: GitLabTodo[] = [];
  loading: boolean = false;

  constructor(private readonly userSvr: UserService) { }

  ngOnInit(): void {
    this.loading = true;
    this.userSvr.getTodos().pipe(take(1), finalize(() => this.loading = false)).subscribe(todos => {
      this.todos = todos;
    });
  }

  markAsDone(todo: GitLabTodo): void {

  }
}
