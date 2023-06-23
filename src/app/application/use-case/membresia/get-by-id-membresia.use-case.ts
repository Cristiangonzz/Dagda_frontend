import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MembresiaDomainEntity } from 'src/app/domain/entities/membresia.entity.domain';
import { MembresiaService } from 'src/app/domain/services/membresia.service.domain';

@Injectable({
  providedIn: 'root',
})
export class GetMembresiaUseCase {
  [x: string]: any;
  constructor(private membresiaService: MembresiaService) {}

  execute(data: string): Observable<MembresiaDomainEntity> {
    return this.membresiaService.get(data);
  }
}
