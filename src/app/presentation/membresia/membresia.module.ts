import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import {  ReactiveFormsModule } from '@angular/forms';
import { CreateMembresiaComponent } from './crear-membresia/create-membresia.component';
import { GetAllMembresiaComponent } from './get-all-membresia/get-all-membresia.component';
import { UpdateMembresiaComponent } from './update-membresia/update-membresia.component';
import { RoutingMembresiaModule } from './routing-membresia.module';



@NgModule({
  declarations: [
    CreateMembresiaComponent,
    GetAllMembresiaComponent,
    UpdateMembresiaComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RoutingMembresiaModule,
    SharedModule, 
  
  ],
  exports: [],
})
export class MembresiaModule { }
