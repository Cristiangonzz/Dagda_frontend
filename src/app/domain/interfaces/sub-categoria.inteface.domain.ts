import { ICategoriaDomain } from './categoria.inteface.domain';

export interface ISubCategoriaDomain {
  id: string;
  categoria?: ICategoriaDomain;
  nombre?: string;
  vigente?: boolean;
}
