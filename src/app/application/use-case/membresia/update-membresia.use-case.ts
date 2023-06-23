import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UpdateMembresiaDto } from 'src/app/infrastructure/dto/create/update-membresia.dto';
import { MembresiaDomainEntity } from 'src/app/domain/entities/membresia.entity.domain';
import { MembresiaService } from 'src/app/domain/services/membresia.service.domain';

@Injectable({
  providedIn: 'root',
})
export class UpdateMembresiaUseCase {
  constructor(private membresiaService: MembresiaService) {}

  execute(id: string, data: UpdateMembresiaDto): Observable<MembresiaDomainEntity> {
    return this.membresiaService.update(id, data);
  }
}
