import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UsuarioReferenciaService } from 'src/app/domain/services/usuario-referente.service.domain';
import { UsuarioReferenciaDomainEntity } from 'src/app/domain/entities/usuario-referencia.entity.domain';

@Injectable({
  providedIn: 'root',
})
export class GetIdUsuarioReferenciaUseCase {
  constructor(private usuarioReferenciaService: UsuarioReferenciaService) {}

  execute(param: string): Observable<UsuarioReferenciaDomainEntity> {
    return this.usuarioReferenciaService.get(param);
  }
}
