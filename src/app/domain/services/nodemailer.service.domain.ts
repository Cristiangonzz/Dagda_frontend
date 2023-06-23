import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SendEmailDto } from 'src/app/infrastructure/dto/send-email.dto';
import { MensajeCorreoDomainEntity } from '../entities/mensaje-correo.entity.domain';

@Injectable({
  providedIn: 'root',
})
export abstract class NodeMailerService  {
  abstract sendMail(data: SendEmailDto): Observable<MensajeCorreoDomainEntity>;
}
