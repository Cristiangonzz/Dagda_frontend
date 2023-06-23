import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UsuarioService } from 'src/app/domain/services/usuario.service.domain';
import { RegistrarUsuarioDto } from 'src/app/infrastructure/dto/create/create-usuario.dto';
import { UsuarioDomainEntity } from 'src/app/domain/entities/usuario.entity.domain';

@Injectable({
  providedIn: 'root',
})
export class CreateUsuarioUseCase {
  constructor(private usuarioService: UsuarioService) {}

  execute(param: RegistrarUsuarioDto): Observable<UsuarioDomainEntity > {
    return this.usuarioService.create(param);
  }
}
