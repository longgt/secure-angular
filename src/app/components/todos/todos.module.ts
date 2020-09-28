import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './todos.component';
import { PipesModule } from '../../shared/pipes/pipes-module';


@NgModule({
  declarations: [TodosComponent],
  imports: [
    CommonModule,
    NzListModule,
    TodosRoutingModule,
    PipesModule
  ]
})
export class TodosModule { }
