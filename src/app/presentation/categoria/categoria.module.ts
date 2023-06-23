import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InfrastructureModule } from 'src/app/infrastructure/infrastructure.module';
import { CreateCategoriaComponent } from './create/create-categoria.component';
import { RoutingCategoriaModule } from './routing-categoria.module';
import { TablaCategoriaComponent } from './tabla/tabla-categoria.component';

@NgModule({
  declarations: [
    CreateCategoriaComponent,
    TablaCategoriaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    RoutingCategoriaModule,
    InfrastructureModule,
  ],
  exports: [
    CreateCategoriaComponent,
    TablaCategoriaComponent,
  ],
})
export class CategoriaModule {}
