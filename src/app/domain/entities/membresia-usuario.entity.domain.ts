import { IMembresiaUsuarioDomain } from '../interfaces/membresia-usuario.inteface.domain';
import { IMembresiaDomain } from '../interfaces/membresia.inteface.domain';
import { IUsuarioDomain } from '../interfaces/usuario.interface.domain';
export class MembresiaUsuarioDomainEntity implements IMembresiaUsuarioDomain {
  id: string;
  membresia: IMembresiaDomain;
  usuario: IUsuarioDomain;
  fecha_creado?: number | Date;
  activo?: boolean;

  constructor(
    id?: string,
    membresia?: IMembresiaDomain,
    usuario?: IUsuarioDomain,
    fecha_creado?: Date,
    activo?: boolean
  ) {
    this.id = id as string;
    this.membresia = membresia as IMembresiaDomain;
    this.usuario = usuario as IUsuarioDomain;
    this.fecha_creado = fecha_creado as number | Date;
    this.activo = activo as boolean;
  }
}
