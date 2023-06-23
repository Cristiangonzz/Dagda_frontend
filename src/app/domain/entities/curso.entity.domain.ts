import { ICategoriaDomain } from '../interfaces/categoria.inteface.domain';
import { ICursoDomain } from '../interfaces/curso.interface.domain';
import { IProgramaCursoDomain } from '../interfaces/programa-curso.interface.domain';
import { ISubCategoriaDomain } from '../interfaces/sub-categoria.inteface.domain';

export class CursoDomainEntity implements ICursoDomain {
  cursoId?: string;
  fecha_creada?: string | number | Date;
  titulo: string;
  imagen?: string;
  descripcion?: string;
  categoria: ICategoriaDomain;
  subCategoria?: ISubCategoriaDomain;
  vigente?: boolean;
  detalle?: string;
  precio: number;
  programa: IProgramaCursoDomain[];

  constructor(
    cursoId?: string,

    fecha_creada?: string,
    titulo?: string,
    imagen?: string,
    descripcion?: string,
    categoria?: ICategoriaDomain,
    subCategoria?: ISubCategoriaDomain,
    vigente?: boolean,
    detalle?: string,
    precio?: number,
    programa?: IProgramaCursoDomain[]
  ) {
    this.cursoId = cursoId as string;
    this.fecha_creada = fecha_creada as string | number | Date;
    this.titulo = titulo as string;
    this.imagen = imagen as string;
    this.descripcion = descripcion as string;
    this.categoria = categoria as ICategoriaDomain;
    this.subCategoria = subCategoria as ISubCategoriaDomain;
    this.vigente = vigente as boolean;
    this.detalle = detalle as string;
    this.precio = precio as number;
    this.programa = programa as IProgramaCursoDomain[];
  }
}
