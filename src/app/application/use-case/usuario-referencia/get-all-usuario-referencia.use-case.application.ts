import { Observable, filter, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { UsuarioReferenciaService } from 'src/app/domain/services/usuario-referente.service.domain';
import { UsuarioReferenciaDomainEntity } from 'src/app/domain/entities/usuario-referencia.entity.domain';

@Injectable({
  providedIn: 'root',
})
export class GetAllUsuarioReferenciaUseCase {
  constructor(private usuarioReferenciaService: UsuarioReferenciaService) {}

  execute(referente : string): Observable<UsuarioReferenciaDomainEntity[]> {
    return this.usuarioReferenciaService.getAll().pipe(
      map((value: UsuarioReferenciaDomainEntity[]) => {
        return value.filter((item: UsuarioReferenciaDomainEntity) => {
          return item.usu_referente === referente;
        });
      })
    );
  }
}
