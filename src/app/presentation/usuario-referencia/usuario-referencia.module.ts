import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RoutingUsuarioReferenciaModule } from './routing-usuario-referencia.module';
import { UsuarioReferenciaComponent } from './clientes-usuario-referencias/usuario-referencia.component';

@NgModule({
  declarations: [
    UsuarioReferenciaComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RoutingUsuarioReferenciaModule,
    SharedModule,
  ],
  exports: [
    UsuarioReferenciaComponent,
  ],
})
export class UsuarioReferenciaModule {}
