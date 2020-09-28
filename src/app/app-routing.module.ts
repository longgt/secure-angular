import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.SsoLoginModule) },
  { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: 'profile', loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule) },
  { path: 'todos', loadChildren: () => import('./components/todos/todos.module').then(m => m.TodosModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
