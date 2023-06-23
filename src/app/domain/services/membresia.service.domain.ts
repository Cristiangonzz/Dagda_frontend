import { CrearMembresiaDto } from 'src/app/infrastructure/dto/create/create-membresia.dto';
import { MembresiaDomainEntity } from '../entities/membresia.entity.domain';
import { BaseService } from './base.service.domain';
import { Injectable } from '@angular/core';
import { UpdateMembresiaDto } from 'src/app/infrastructure/dto/create/update-membresia.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class MembresiaService extends BaseService<MembresiaDomainEntity> {
  abstract create(data: CrearMembresiaDto): Observable<MembresiaDomainEntity>;
  abstract update(id: string, entity: UpdateMembresiaDto): Observable<MembresiaDomainEntity>;
}
