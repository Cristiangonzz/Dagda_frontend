import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InfrastructureModule } from 'src/app/infrastructure/infrastructure.module';
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
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RoutingMembresiaModule,
    InfrastructureModule,
    SharedModule, 
  
  ],
  exports: [],
})
export class MembresiaModule { }
