import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MembresiaDomainEntity } from 'src/app/domain/entities/membresia.entity.domain';
import { MembresiaService } from 'src/app/domain/services/membresia.service.domain';

@Injectable({
  providedIn: 'root',
})
export class GetMembresiaByNameUseCase {
  constructor(private membresiaService: MembresiaService) {}

  execute(data: string): Observable<MembresiaDomainEntity> {
    return this.membresiaService.getByName(data);
  }
}
