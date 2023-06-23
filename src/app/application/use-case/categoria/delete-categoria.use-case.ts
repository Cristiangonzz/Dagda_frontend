import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CategoriaService } from 'src/app/domain/services/categoria.service.domain';

@Injectable({
  providedIn: 'root',
})
export class DeleteCategoriaUseCase {
  constructor(private categoriaService: CategoriaService) {}

  execute(data: string): Observable<boolean> {
    return this.categoriaService.delete(data);
  }
}
