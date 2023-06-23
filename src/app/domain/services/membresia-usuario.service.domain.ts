import { BaseService } from './base.service.domain';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MembresiaUsuarioDomainEntity } from '../entities/membresia-usuario.entity.domain';
import { CrearMembresiaUsuarioDto } from 'src/app/infrastructure/dto/create/create-membresia-usuario.dto';

@Injectable({
  providedIn: 'root',
})
export abstract class MembresiaUsuarioService extends BaseService<MembresiaUsuarioDomainEntity> {
  abstract create(data: CrearMembresiaUsuarioDto): Observable<MembresiaUsuarioDomainEntity>;
}
