import { IInscripcionDomain } from '../interfaces/inscripcion.inteface.domain';
import { ICursoDomain } from '../interfaces/curso.interface.domain';
import { IUsuarioDomain } from '../interfaces/usuario.interface.domain';

export class InscripcionDomainEntity implements IInscripcionDomain {
  incripcionId: string;
  curso?: ICursoDomain;
  usuario?: IUsuarioDomain;
  fechaInscripcion?: Date;
  pago?: boolean;

  constructor(
    incripcionId?: string,
    curso?: ICursoDomain,
    usuario?: IUsuarioDomain,
    fechaInscripcion?: Date,
    pago?: boolean
  ) {
    this.incripcionId = incripcionId as string;
    this.curso = curso as ICursoDomain;
    this.usuario = usuario as IUsuarioDomain;
    this.fechaInscripcion = fechaInscripcion as Date;
    this.pago = pago as boolean;
  }
}
