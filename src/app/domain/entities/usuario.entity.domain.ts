import { IUsuarioDomain } from '../interfaces/usuario.interface.domain';
export class UsuarioDomainEntity implements IUsuarioDomain {
  usuarioId?: string;
  primer_nombre?: string;
  segundo_nombre?: string;
  primer_apellido?: string;
  segundo_apellido?: string;
  cod_telefono?: string;
  telefono?: string;
  usuario: string;
  foto?: string;
  tipo_usuario?: number;
  clave: string;
  usuario_verificado?: number;
  email: string;
  vigente?: boolean;

  constructor(
    usuarioId?: string,
    primer_nombre?: string,
    segundo_nombre?: string,
    primer_apellido?: string,
    segundo_apellido?: string,
    cod_telefono?: string,
    telefono?: string,
    usuario?: string,
    foto?: string,
    tipo_usuario?: number,
    clave?: string,
    usuario_verificado?: number,
    email?: string,
    vigente?: boolean,
  ) {
    this.usuarioId = usuarioId as string;
    this.primer_nombre = primer_nombre as string;
    this.segundo_nombre = segundo_nombre as string;
    this.primer_apellido = primer_apellido as string;
    this.segundo_apellido = segundo_apellido as string;
    this.cod_telefono = cod_telefono as string;
    this.telefono = telefono as string;
    this.usuario = usuario as string;
    this.foto = foto as string;
    this.clave = clave as string;
    this.email = email as string;
    this.tipo_usuario = tipo_usuario as number;
    this.usuario_verificado = usuario_verificado as number;
    this.vigente = vigente as boolean;
 
  }
}
