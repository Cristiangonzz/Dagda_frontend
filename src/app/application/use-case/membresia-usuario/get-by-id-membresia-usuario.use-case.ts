import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MembresiaUsuarioDomainEntity } from 'src/app/domain/entities/membresia-usuario.entity.domain';
import { MembresiaUsuarioService } from 'src/app/domain/services/membresia-usuario.service.domain';

@Injectable({
  providedIn: 'root',
})
export class GetMembresiaUsuarioUseCase {
  
  constructor(private membresiaUsuarioService: MembresiaUsuarioService) {}

  execute(data: string): Observable<MembresiaUsuarioDomainEntity> {
    return this.membresiaUsuarioService.get(data);
  }
}
