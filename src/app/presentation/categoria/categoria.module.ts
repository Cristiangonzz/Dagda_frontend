import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
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
    ReactiveFormsModule,
    SharedModule,
    RoutingCategoriaModule,
  ],
  exports: [
    CreateCategoriaComponent,
    TablaCategoriaComponent,
  ],
})
export class CategoriaModule {}
