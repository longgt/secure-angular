import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SsoLoginRoutingModule } from './login-routing.module';

import { SsoLoginComponent } from './login.component';


@NgModule({
  imports: [
    CommonModule,
    SsoLoginRoutingModule
  ],
  declarations: [SsoLoginComponent],
  exports: [SsoLoginComponent]
})
export class SsoLoginModule { }
