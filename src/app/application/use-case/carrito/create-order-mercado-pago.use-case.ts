import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MercadoPagoService } from 'src/app/domain/services/mercado-pago.service.domain';
import { CreateOrderMercadoPagoDto } from 'src/app/infrastructure/dto/create/create-order-mercado-pago.dto';

@Injectable({
  providedIn: 'root',
})
export class CreateOrderMercadoPagoUseCase {
  constructor(private mercadoPagoService: MercadoPagoService) {}

  execute(param: CreateOrderMercadoPagoDto): Observable<any> {
    return this.mercadoPagoService.createOrder(param)
  }
}
