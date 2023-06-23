import { ICursoDomain } from './curso.interface.domain';
import { IUsuarioDomain } from './usuario.interface.domain';

export interface IInscripcionDomain {
  incripcionId: string;
  curso?: ICursoDomain;
  usuario?: IUsuarioDomain;
  fechaInscripcion?: Date;
  pago?: boolean;
}
