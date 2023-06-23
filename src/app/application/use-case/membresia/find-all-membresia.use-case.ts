import { Injectable } from '@angular/core';
import { BehaviorSubject, asyncScheduler } from 'rxjs';
import { MembresiaDomainEntity } from 'src/app/domain/entities/membresia.entity.domain';
import { MembresiaService } from 'src/app/domain/services/membresia.service.domain';

@Injectable({
  providedIn: 'root',
})
export class GetAllMembresiaUseCase {
  private status: MembresiaDomainEntity[] = [];

  public statusEmmit: BehaviorSubject<MembresiaDomainEntity[]> = new BehaviorSubject<
  MembresiaDomainEntity[]
  >(this.status);

  constructor(private membresiaservice: MembresiaService) {}

  execute = () => {
    if (this.statusEmmit.observed && !this.statusEmmit.closed) {
      this.membresiaservice.getAll().subscribe({
        next: (value: MembresiaDomainEntity[]) => {
          this.status = value;
        },
        complete: () => {
          this.statusEmmit.next(this.status);
        },
      });
    } else {
      asyncScheduler.schedule(this.execute, 1000);
    }
  };
}
