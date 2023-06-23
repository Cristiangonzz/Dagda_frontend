import { Observable } from 'rxjs';
import { UsuarioReferenciaDomainEntity } from '../entities/usuario-referencia.entity.domain';
import { BaseService } from './base.service.domain';
import { Injectable } from '@angular/core';
import { UpdateUsuarioReferenciaDto } from 'src/app/infrastructure/dto/create/update-usuario-referencia.dto';
import { RegistrarUsuarioReferenciaDto } from 'src/app/infrastructure/dto/create/create-usuario-referencia.dto';

@Injectable({
  providedIn: 'root',
})
export abstract class UsuarioReferenciaService extends BaseService<UsuarioReferenciaDomainEntity> {
  abstract create(data: RegistrarUsuarioReferenciaDto): Observable<UsuarioReferenciaDomainEntity>;
  abstract update(id: string, entity: UpdateUsuarioReferenciaDto): Observable<UsuarioReferenciaDomainEntity>;

}
