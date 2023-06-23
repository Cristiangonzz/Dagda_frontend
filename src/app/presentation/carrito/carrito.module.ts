import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
    ReactiveFormsModule,
    RoutingCarritoModule,
  ],
  exports: [CarritoComponent],
})
export class CarritoModule {}
