import { Injectable } from '@angular/core';
import { BaseService } from './base.service.domain';
import { InscripcionDomainEntity } from '../entities/inscripcion.entity.domain';
import { CrearInscripcionDto } from 'src/app/infrastructure/dto/create/create-inscripcion.dto';
import { Observable } from 'rxjs';
import { IUsuarioCursoInscripcionDomain } from '../interfaces/find-usuario-curso-inscripcion.inteface.domain';

@Injectable({
  providedIn: 'root',
})
export abstract class InscripcionService extends BaseService<InscripcionDomainEntity> {
  abstract create(
    data: CrearInscripcionDto
  ): Observable<InscripcionDomainEntity>;
  abstract FindUsuarioCursoInscripcion(
    data: IUsuarioCursoInscripcionDomain
  ): Observable<InscripcionDomainEntity[]>;
}
