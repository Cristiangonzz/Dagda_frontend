import { BehaviorSubject, Observable, asyncScheduler } from 'rxjs';
import { Injectable } from '@angular/core';
import { InscripcionService } from 'src/app/domain/services/inscripcion.service.domain';
import { InscripcionDomainEntity } from 'src/app/domain/entities/inscripcion.entity.domain';

@Injectable({
  providedIn: 'root',
})
export class GetAllInscripcionUseCase {
  private incripcion: InscripcionDomainEntity[] = [];

  public inscripcionesEmmit: BehaviorSubject<InscripcionDomainEntity[]> = new BehaviorSubject<
  InscripcionDomainEntity[]
  >(this.incripcion);
  constructor(private inscripcionService: InscripcionService) {}

  execute = () => {
    if (this.inscripcionesEmmit.observed && !this.inscripcionesEmmit.closed) {
      this.inscripcionService.getAll().subscribe({
        next: (value: InscripcionDomainEntity[]) => {
          this.incripcion = value;
        },
        complete: () => {
          this.inscripcionesEmmit.next(this.incripcion);
        },
      });
    } else {
      asyncScheduler.schedule(this.execute, 1000);
    }
  };
}
