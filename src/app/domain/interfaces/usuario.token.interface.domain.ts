import { IUsuarioDomain } from "./usuario.interface.domain";

export interface IUsuarioTokenDomain{
    iat: number | undefined;
    usuario : IUsuarioDomain | undefined;
   
}