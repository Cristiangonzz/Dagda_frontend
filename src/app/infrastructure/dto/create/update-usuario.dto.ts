export interface UpdateUsuarioDto {
  primer_nombre?: string;

  segundo_nombre?: string;

  primer_apellido?: string;

  segundo_apellido?: string;

  telefono?: string;

  foto?: string;

  usuario?: string;

  clave?: string;

  email?: string;

  tipo_usuario?: number;

  usuario_verificado?: number;

  vigente?: boolean;
}
