import { IMembresiaDomain } from '../interfaces/membresia.inteface.domain';
export class MembresiaDomainEntity implements IMembresiaDomain {
  id?: string;
  nombre: string;
  vigente?: boolean;
  puede_referenciar?: boolean;
  costo: number;

  constructor(
    id?: string,
    nombre?: string,
    vigente?: boolean,
    puede_referenciar?: boolean,
    costo?: number
  ) {
    this.id = id as string;
    this.nombre = nombre as string;
    this.vigente = vigente as boolean;
    this.puede_referenciar = puede_referenciar as boolean;
    this.costo = costo as number;
  }
}
