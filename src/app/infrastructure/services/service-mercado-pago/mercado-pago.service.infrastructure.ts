import { Injectable } from '@angular/core';
import {  Observable} from 'rxjs';
import { MercadoPagoService } from 'src/app/domain/services/mercado-pago.service.domain';
import { CreateOrderMercadoPagoDto } from '../../dto/create/create-order-mercado-pago.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MercadoPagoImplementationService extends MercadoPagoService {
  
  URL = 'http://localhost:3001';

  constructor(private http: HttpClient) {
    super();
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  createOrder(data: CreateOrderMercadoPagoDto): Observable<any> {
    return this.http.post<any>(
      `${this.URL}/create-order`,
      data,
      this.httpOptions
    );
  }
 
}
