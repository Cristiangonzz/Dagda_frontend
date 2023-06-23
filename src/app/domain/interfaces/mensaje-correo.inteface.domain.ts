import { IDireccionCorreoDomain } from "./direccion-correo.inteface.domain";

export interface IMensajeCorreoDomain {
  to: IDireccionCorreoDomain;
  from: IDireccionCorreoDomain;
  subject: string;
  body: string ;

}
