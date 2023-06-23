import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioReferenciaDomainEntity } from 'src/app/domain/entities/usuario-referencia.entity.domain';
import { UsuarioReferenciaService } from 'src/app/domain/services/usuario-referente.service.domain';
import { UpdateUsuarioReferenciaDto } from 'src/app/infrastructure/dto/create/update-usuario-referencia.dto';

@Injectable({
  providedIn: 'root',
})
export class UpdateUsuarioReferenciaUseCase {
  constructor(private usuarioReferenciaService: UsuarioReferenciaService) {}

  execute(id: string, data: UpdateUsuarioReferenciaDto): Observable<UsuarioReferenciaDomainEntity> {
    return this.usuarioReferenciaService.update(id, data);
  }
}
