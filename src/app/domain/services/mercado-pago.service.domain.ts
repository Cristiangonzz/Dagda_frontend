import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateOrderMercadoPagoDto } from 'src/app/infrastructure/dto/create/create-order-mercado-pago.dto';

@Injectable({
  providedIn: 'root',
})
export abstract class MercadoPagoService{
  abstract createOrder(data: CreateOrderMercadoPagoDto): Observable<any>;
}
