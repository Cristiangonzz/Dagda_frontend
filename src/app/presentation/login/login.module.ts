import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RoutingLoginModule } from './routing-login.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {  ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({ declarations: [LoginComponent],
    exports: [LoginComponent], imports: [CommonModule,
        ReactiveFormsModule,
        SharedModule,
        RoutingLoginModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class LoginModule { }
