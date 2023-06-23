import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UsuarioService } from 'src/app/domain/services/usuario.service.domain';
import { UsuarioDomainEntity } from 'src/app/domain/entities/usuario.entity.domain';

@Injectable({
  providedIn: 'root',
})
export class GetIdUsuarioUseCase {
  constructor(private usuarioService: UsuarioService) {}

  execute(param: string): Observable<UsuarioDomainEntity> {
    return this.usuarioService.get(param);
  }
}
