import { Observable } from 'rxjs';
import { CategoriaDomainEntity } from 'src/app/domain/entities/categoria.entity.domain';
import { CategoriaService } from 'src/app/domain/services/categoria.service.domain';

export class CreateCategoriaUseCase {
  constructor(private categoriaService: CategoriaService) {}

  execute(param: CategoriaDomainEntity): Observable<CategoriaDomainEntity> {
    return this.categoriaService.create(param);
  }
}
