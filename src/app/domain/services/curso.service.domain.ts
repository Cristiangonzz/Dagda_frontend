import { CrearCursoDto } from 'src/app/infrastructure/dto/create/create-curso.dto';
import { CursoDomainEntity } from '../entities/curso.entity.domain';
import { BaseService } from './base.service.domain';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateCursoDto } from 'src/app/infrastructure/dto/create/update-curso.dto';
import { ImagenCursoDto } from 'src/app/infrastructure/dto/create/guardar-imagen-curso.dto';

@Injectable({
  providedIn: 'root',
})
export abstract class CursoService extends BaseService<CursoDomainEntity> {
  abstract create(data: CrearCursoDto): Observable<CursoDomainEntity>;
  abstract update(id: string, entity: UpdateCursoDto): Observable<CursoDomainEntity>;
  abstract saveImagen(imagen: FormData): Observable<string>;
  abstract getimagen(filname: string): Observable<any>;
}
