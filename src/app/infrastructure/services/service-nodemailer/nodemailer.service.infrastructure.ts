import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NodeMailerService } from 'src/app/domain/services/nodemailer.service.domain';
import { MensajeCorreoDomainEntity } from 'src/app/domain/entities/mensaje-correo.entity.domain';
import { SendEmailDto } from '../../dto/send-email.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NodeMailerImplementationService extends NodeMailerService {
  URL =
    'https://backend-academy-cristianuruuy-dev.apps.rm2.thpm.p1.openshiftapps.com';

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

  sendMail(data: SendEmailDto): Observable<MensajeCorreoDomainEntity> {
    
    return this.http.post<MensajeCorreoDomainEntity>(
      `${this.URL}/nodemailer`,
      data
    );
  }
}
