import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CategoriaService } from 'src/app/domain/services/categoria.service.domain';
import { CategoriaDomainEntity } from 'src/app/domain/entities/categoria.entity.domain';
import { UpdateCategoriaDto } from 'src/app/infrastructure/dto/create/update-categoria.dto';

@Injectable({
  providedIn: 'root',
})
export class UpdateCategoriaUseCase {
  constructor(private categoriaService: CategoriaService) {}

  execute(id: string, data: UpdateCategoriaDto): Observable<CategoriaDomainEntity> {
    return this.categoriaService.update(id, data);
  }
}
