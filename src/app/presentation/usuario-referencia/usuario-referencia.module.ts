import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { InfrastructureModule } from 'src/app/infrastructure/infrastructure.module';
import { SharedModule } from '../shared/shared.module';
import { RoutingUsuarioReferenciaModule } from './routing-usuario-referencia.module';
import { UsuarioReferenciaComponent } from './clientes-usuario-referencias/usuario-referencia.component';

@NgModule({
  declarations: [
    UsuarioReferenciaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
    RoutingUsuarioReferenciaModule,

    InfrastructureModule,
    SharedModule,
  ],
  exports: [
    UsuarioReferenciaComponent,
  ],
})
export class UsuarioReferenciaModule {}
