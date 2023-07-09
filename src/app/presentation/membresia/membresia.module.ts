import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import {  ReactiveFormsModule } from '@angular/forms';
import { CreateMembresiaComponent } from './crear-membresia/create-membresia.component';
import { GetAllMembresiaComponent } from './get-all-membresia/get-all-membresia.component';
import { UpdateMembresiaComponent } from './update-membresia/update-membresia.component';
import { RoutingMembresiaModule } from './routing-membresia.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { GetMembresiaComponent } from './get-membresia/get-membresia.component';



@NgModule({
  declarations: [
    CreateMembresiaComponent,
    GetAllMembresiaComponent,
    UpdateMembresiaComponent,
    GetMembresiaComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RoutingMembresiaModule,
    SharedModule, 
    AngularEditorModule,
  
  ],
  exports: [
    CreateMembresiaComponent,
    GetAllMembresiaComponent,
    UpdateMembresiaComponent,
    GetMembresiaComponent,
  ],
})
export class MembresiaModule { }
