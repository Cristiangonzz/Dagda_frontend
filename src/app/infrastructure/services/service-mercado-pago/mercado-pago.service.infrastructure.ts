import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable} from 'rxjs';
import { CursoService } from 'src/app/domain/services/curso.service.domain';
import { CrearCursoDto } from '../../dto/create/create-curso.dto';
import { CursoDomainEntity } from 'src/app/domain/entities/curso.entity.domain';
import { UpdateCursoDto } from '../../dto/create/update-curso.dto';
import { MercadoPagoService } from 'src/app/domain/services/mercado-pago.service.domain';
import { CreateOrderMercadoPagoDto } from '../../dto/create/create-order-mercado-pago.dto';

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
