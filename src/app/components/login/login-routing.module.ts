import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SsoLoginComponent } from './login.component';

const routes: Routes = [
  { path: '', component: SsoLoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SsoLoginRoutingModule { }
