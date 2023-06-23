import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { InfrastructureModule } from 'src/app/infrastructure/infrastructure.module';
import { RoutingCarritoModule } from './routing-carrito.module';
import { CarritoComponent } from './carrito/carrito.component';
import { SuccessComponent } from './pago-mercado-pago/success/success.component';

@NgModule({
  declarations: [
    CarritoComponent,
    SuccessComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
    RoutingCarritoModule,
    InfrastructureModule,
  ],
  exports: [CarritoComponent],
})
export class CarritoModule {}
