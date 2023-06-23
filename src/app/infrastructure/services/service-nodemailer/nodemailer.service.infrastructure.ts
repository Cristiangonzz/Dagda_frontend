import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaDomainEntity } from 'src/app/domain/entities/categoria.entity.domain';
import { CategoriaService } from 'src/app/domain/services/categoria.service.domain';
import { CrearCategoriaDto } from '../../dto/create/create-categoria.dto';
import { UpdateCategoriaDto } from '../../dto/create/update-categoria.dto';
import { NodeMailerService } from 'src/app/domain/services/nodemailer.service.domain';
import { MensajeCorreoDomainEntity } from 'src/app/domain/entities/mensaje-correo.entity.domain';
import { SendEmailDto } from '../../dto/send-email.dto';

@Injectable({
  providedIn: 'root',
})
export class NodeMailerImplementationService extends NodeMailerService {
  URL = 'http://localhost:3000';
  
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
  
  override sendMail(data: SendEmailDto): Observable<MensajeCorreoDomainEntity> {
    return this.http.post<MensajeCorreoDomainEntity>(
      `${this.URL}/nodemailer`,
      data,
      this.httpOptions
    );
  }
  
}
