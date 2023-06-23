import { ICategoriaDomain } from '../interfaces/categoria.inteface.domain';
import { ISubCategoriaDomain } from '../interfaces/sub-categoria.inteface.domain';
export class SubCategoriaEntityDomain implements ISubCategoriaDomain {
  id: string;
  categoria?: ICategoriaDomain;
  nombre?: string;
  vigente?: boolean;

  constructor(
    id?: string,
    nombre?: string,
    vigente?: boolean,
    categoria?: ICategoriaDomain,
  ) {
    this.id = id as string;
    this.nombre = nombre as string;
    this.categoria = categoria as ICategoriaDomain;
    this.vigente = vigente as boolean;
  }
}
