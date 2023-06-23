import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MembresiaUsuarioDomainEntity } from 'src/app/domain/entities/membresia-usuario.entity.domain';
import { MembresiaUsuarioService } from 'src/app/domain/services/membresia-usuario.service.domain';
import { CrearMembresiaUsuarioDto } from 'src/app/infrastructure/dto/create/create-membresia-usuario.dto';

@Injectable({
  providedIn: 'root',
})
export class CreateMembresiaUsuarioUseCase {
  constructor(private membresiaUsuarioService: MembresiaUsuarioService) {}

  execute(param: CrearMembresiaUsuarioDto): Observable<MembresiaUsuarioDomainEntity> {
    return this.membresiaUsuarioService.create(param);
  }
}
