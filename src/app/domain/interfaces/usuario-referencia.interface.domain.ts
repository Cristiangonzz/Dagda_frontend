
export interface IUsuarioReferenciaDomain{
    id: string;
    usu_referente?: string;
    usu_referido?: string;
    fecha_referencia?: Date | number;
}