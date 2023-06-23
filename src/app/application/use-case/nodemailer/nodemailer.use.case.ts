import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeCorreoDomainEntity } from 'src/app/domain/entities/mensaje-correo.entity.domain';
import { SendEmailDto } from 'src/app/infrastructure/dto/send-email.dto';
import { NodeMailerService } from 'src/app/domain/services/nodemailer.service.domain';

@Injectable({
  providedIn: 'root',
})
export class NodeMailerUseCase {
  constructor(private readonly nodeMailer: NodeMailerService) {}
  execute(data: SendEmailDto): Observable<MensajeCorreoDomainEntity> {
    return this.nodeMailer.sendMail(data);
  }
}
