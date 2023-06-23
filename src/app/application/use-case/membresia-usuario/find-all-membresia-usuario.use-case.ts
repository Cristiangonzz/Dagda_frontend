import { Injectable } from '@angular/core';
import { BehaviorSubject, asyncScheduler } from 'rxjs';
import { MembresiaUsuarioDomainEntity } from 'src/app/domain/entities/membresia-usuario.entity.domain';
import { MembresiaUsuarioService } from 'src/app/domain/services/membresia-usuario.service.domain';

@Injectable({
  providedIn: 'root',
})
export class GetAllMembresiaUsuarioUseCase {
  private status: MembresiaUsuarioDomainEntity[] = [];

  public statusEmmit: BehaviorSubject<MembresiaUsuarioDomainEntity[]> =
    new BehaviorSubject<MembresiaUsuarioDomainEntity[]>(this.status);

  constructor(private membresiaUsuarioservice: MembresiaUsuarioService) {}

  execute = () => {
    if (this.statusEmmit.observed && !this.statusEmmit.closed) {
      this.membresiaUsuarioservice.getAll().subscribe({
        next: (value: MembresiaUsuarioDomainEntity[]) => {
          this.status = value;
          console.log('aca retorno todas las membresia Usuarios', this.status);
        },
        complete: () => {
          this.statusEmmit.next(this.status);
        },
      });
    } else {
      asyncScheduler.schedule(this.execute, 100);
    }
  };
}
