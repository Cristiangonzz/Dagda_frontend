import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MembresiaDomainEntity } from 'src/app/domain/entities/membresia.entity.domain';
import { MembresiaService } from 'src/app/domain/services/membresia.service.domain';
import { CrearMembresiaDto } from 'src/app/infrastructure/dto/create/create-membresia.dto';

@Injectable({
  providedIn: 'root',
})
export class CreateMembresiaUseCase {
  constructor(private membresiaService: MembresiaService) {}

  execute(param: CrearMembresiaDto): Observable<MembresiaDomainEntity> {
    return this.membresiaService.create(param);
  }
}
