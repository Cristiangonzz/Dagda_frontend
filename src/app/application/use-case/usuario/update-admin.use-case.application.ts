import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioDomainEntity } from 'src/app/domain/entities/usuario.entity.domain';
import { UsuarioService } from 'src/app/domain/services/usuario.service.domain';
import { UpdateUsuarioDto } from 'src/app/infrastructure/dto/create/update-usuario.dto';

@Injectable({
  providedIn: 'root',
})
export class UpdateUsuarioUseCase {
  constructor(private usuarioService: UsuarioService) {}

  execute(id: string, data: UpdateUsuarioDto): Observable<UsuarioDomainEntity> {
    return this.usuarioService.update(id, data);
  }
}
