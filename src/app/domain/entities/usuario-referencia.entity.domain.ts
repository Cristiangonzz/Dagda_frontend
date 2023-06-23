import { IUsuarioReferenciaDomain } from '../interfaces/usuario-referencia.interface.domain';
export class UsuarioReferenciaDomainEntity implements IUsuarioReferenciaDomain {
  id: string;
  usu_referente?: string;
  usu_referido?: string;
  fecha_referencia?: number | Date;

  constructor(
    id?: string,
    usu_referente?: string,
    usu_referido?: string,
    fecha_referencia?: number | Date,
  ) {
    this.id = id as string;
    this.usu_referente = usu_referente as string;
    this.usu_referido = usu_referido as string;
    this.fecha_referencia = fecha_referencia as number | Date;
  }
}
