import { Injectable } from '@angular/core';
import { BaseService } from './base.service.domain';
import { SubCategoriaEntityDomain } from '../entities/sub-categoria.entity.domain';

@Injectable({
  providedIn: 'root',
})
export abstract class SubCategoriaService extends BaseService<SubCategoriaEntityDomain> {
}
