import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CursoDomainEntity } from 'src/app/domain/entities/curso.entity.domain';
import { CursoService } from 'src/app/domain/services/curso.service.domain';
import { CrearCursoDto } from 'src/app/infrastructure/dto/create/create-curso.dto';

@Injectable({
  providedIn: 'root',
})
export class CreateCursoUseCase {
  constructor(private cursoService: CursoService) {}

  execute(param: CrearCursoDto): Observable<CursoDomainEntity> {
    return this.cursoService.create(param);
  }
}
