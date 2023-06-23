import { ICategoriaDomain } from '../interfaces/categoria.inteface.domain';

export class CategoriaDomainEntity implements ICategoriaDomain {
  categoriaId?: string;
  nombre: string;
  vigente? : boolean;
  constructor(
    categoriaId?: string,
    nombre?: string,
    vigente?: boolean,
  ) {
    this.categoriaId = categoriaId as string;
    this.nombre = nombre as string;
    this.vigente = vigente as boolean;

  }
}
