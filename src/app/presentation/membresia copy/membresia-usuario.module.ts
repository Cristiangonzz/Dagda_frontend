import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GetMembresiaUsuarioComponent } from './get-membresia-usuario/get-membresia-usuario.component';
import { CreateMembresiaUsuarioComponent } from './crear-membresia-usuario/create-membresia-usuario.component';
import { RoutingMembresiaUsuarioModule } from './routing-membresia-usuario.module';

@NgModule({
  declarations: [
    CreateMembresiaUsuarioComponent,
    GetMembresiaUsuarioComponent,
  
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RoutingMembresiaUsuarioModule,
   
    SharedModule,
  ],
  exports: [
    CreateMembresiaUsuarioComponent,
    GetMembresiaUsuarioComponent,
  ],
})
export class MembresiaUsuarioModule {}
