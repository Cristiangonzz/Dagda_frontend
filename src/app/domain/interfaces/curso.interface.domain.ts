import { ICategoriaDomain } from "./categoria.inteface.domain";
import { IProgramaCursoDomain } from "./programa-curso.interface.domain";
import { ISubCategoriaDomain } from "./sub-categoria.inteface.domain";

export interface ICursoDomain {
  cursoId?: string;
  fecha_creada?: string | Date | number;
  titulo: string;
  imagen?: string;
  descripcion?: string;
  categoria: ICategoriaDomain;
  subCategoria?: ISubCategoriaDomain;
  vigente?: boolean;
  detalle?: string;
  precio: number;
  programa: IProgramaCursoDomain[];
}
