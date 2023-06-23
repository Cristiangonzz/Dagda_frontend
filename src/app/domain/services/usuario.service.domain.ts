import { RegistrarUsuarioDto } from 'src/app/infrastructure/dto/create/create-usuario.dto';
import { UsuarioDomainEntity } from '../entities/usuario.entity.domain';
import { BaseService } from './base.service.domain';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateUsuarioDto } from 'src/app/infrastructure/dto/create/update-usuario.dto';
import { SignInDto } from 'src/app/infrastructure/dto/create/sign-in.dto';

@Injectable({
  providedIn: 'root',
})
export abstract class UsuarioService extends BaseService<UsuarioDomainEntity> {
   abstract create(data: RegistrarUsuarioDto): Observable<UsuarioDomainEntity>;
  abstract update(id: string, entity: UpdateUsuarioDto): Observable<UsuarioDomainEntity>;
  abstract signIn(usuario: SignInDto): Observable<string>;
}
