import { Injectable } from '@angular/core';
import { CategoriaDomainEntity } from '../entities/categoria.entity.domain';
import { BaseService } from './base.service.domain';
import { CrearCategoriaDto } from 'src/app/infrastructure/dto/create/create-categoria.dto';
import { UpdateCategoriaDto } from 'src/app/infrastructure/dto/create/update-categoria.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class CategoriaService extends BaseService<CategoriaDomainEntity> {
  abstract create(data: CrearCategoriaDto): Observable<CategoriaDomainEntity>;
  abstract update(id: string, entity: UpdateCategoriaDto): Observable<CategoriaDomainEntity>;
}
