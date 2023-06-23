import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UsuarioReferenciaService } from 'src/app/domain/services/usuario-referente.service.domain';
import { RegistrarUsuarioReferenciaDto } from 'src/app/infrastructure/dto/create/create-usuario-referencia.dto';
import { UsuarioReferenciaDomainEntity } from 'src/app/domain/entities/usuario-referencia.entity.domain';

@Injectable({
  providedIn: 'root',
})
export class CreateUsuarioReferenciaUseCase {
  constructor(private usuarioReferenciaService: UsuarioReferenciaService) {}

  execute(param: RegistrarUsuarioReferenciaDto): Observable<UsuarioReferenciaDomainEntity > {
    return this.usuarioReferenciaService.create(param);
  }
}
