import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CursoService } from 'src/app/domain/services/curso.service.domain';
import { CursoDomainEntity } from 'src/app/domain/entities/curso.entity.domain';
import { UpdateCursoDto } from 'src/app/infrastructure/dto/create/update-curso.dto';

@Injectable({
  providedIn: 'root',
})
export class UpdateCursoUseCase {
  constructor(private cursoService: CursoService) {}

  execute(id: string, data: UpdateCursoDto): Observable<CursoDomainEntity> {
    return this.cursoService.update(id, data);
  }
}
