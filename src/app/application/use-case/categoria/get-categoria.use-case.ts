import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CategoriaService } from 'src/app/domain/services/categoria.service.domain';
import { CategoriaDomainEntity } from 'src/app/domain/entities/categoria.entity.domain';

@Injectable({
  providedIn: 'root',
})
export class GetCategoriaUseCase {
  constructor(private categoriaService: CategoriaService) {}

  execute(data: string): Observable<CategoriaDomainEntity> {
    return this.categoriaService.get(data);
  }
}
