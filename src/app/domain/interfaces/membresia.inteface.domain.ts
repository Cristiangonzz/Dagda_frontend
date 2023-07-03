export interface IMembresiaDomain{
    id?:string;
    nombre:string;
    beneficios:string;
    fecha_adquirida?: string | number | Date;
    vigente:boolean;
    puede_referenciar?:boolean;
    costo:number;
}