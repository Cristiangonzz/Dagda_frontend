import { IMembresiaDomain } from "./membresia.inteface.domain";
import { IUsuarioDomain } from "./usuario.interface.domain";

export interface IMembresiaUsuarioDomain {
    id: string;
    membresia: IMembresiaDomain;
    usuario: IUsuarioDomain;
    fecha_creado?: Date | number;
    activo?: boolean;
}