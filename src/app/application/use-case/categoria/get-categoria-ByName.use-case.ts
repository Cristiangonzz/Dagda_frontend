import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaDomainEntity } from 'src/app/domain/entities/categoria.entity.domain';
import { CategoriaService } from 'src/app/domain/services/categoria.service.domain';

@Injectable({
  providedIn: 'root',
})
export class GetNameCategoriaUseCase {
  constructor(private categoriaService: CategoriaService) {}

  execute(data: string): Observable<CategoriaDomainEntity> {
    return this.categoriaService.getByName(data);
  }
  
}
