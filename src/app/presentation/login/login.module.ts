import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { InfrastructureModule } from 'src/app/infrastructure/infrastructure.module';
import { RoutingLoginModule } from './routing-login.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    RoutingLoginModule,
    InfrastructureModule,
  ],
  exports: [LoginComponent]
})
export class LoginModule { }
