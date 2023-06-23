export interface IUsuarioDomain{
    usuarioId?: string;
    primer_nombre?:string;
    segundo_nombre?:string;
    primer_apellido?:string;
    segundo_apellido?:string;
    cod_telefono?: string;
    telefono?: string;
    usuario: string;
    foto?: string;
    tipo_usuario?: number; 
    clave: string; 
    usuario_verificado?: number;
    email: string;
    vigente?: boolean;
}