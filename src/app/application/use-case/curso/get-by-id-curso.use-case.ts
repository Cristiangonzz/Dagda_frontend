import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CursoDomainEntity } from 'src/app/domain/entities/curso.entity.domain';
import { CursoService } from 'src/app/domain/services/curso.service.domain';

@Injectable({
  providedIn: 'root',
})
export class GetCourseUseCase {

  constructor(private readonly cursoService: CursoService) {}

  execute(data: string): Observable<CursoDomainEntity> {
    return this.cursoService.get(data);
  }
}
