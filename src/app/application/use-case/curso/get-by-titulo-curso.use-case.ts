import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CursoDomainEntity } from 'src/app/domain/entities/curso.entity.domain';
import { CursoService } from 'src/app/domain/services/curso.service.domain';

@Injectable({
  providedIn: 'root',
})
export class GetCursoByNameUseCase {
  constructor(private cursoService: CursoService) {}

  execute(data: string): Observable<CursoDomainEntity> {
    return this.cursoService.getByName(data);
  }
}
