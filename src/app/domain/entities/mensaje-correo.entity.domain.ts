import { IMensajeCorreoDomain } from '../interfaces/mensaje-correo.inteface.domain';
import { IDireccionCorreoDomain } from '../interfaces/direccion-correo.inteface.domain';

export class MensajeCorreoDomainEntity implements IMensajeCorreoDomain {
  to: IDireccionCorreoDomain;
  from: IDireccionCorreoDomain;
  subject: string;
  body: string;

  constructor(
    to?: IDireccionCorreoDomain,
    from?: IDireccionCorreoDomain,
    subject?: string,
    body?: string
  ) {
    this.to = to as IDireccionCorreoDomain;
    this.from = from as IDireccionCorreoDomain;
    this.subject = subject as string;
    this.body = body as string;
  }
}
