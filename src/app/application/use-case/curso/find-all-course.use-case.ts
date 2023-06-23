import { Injectable } from '@angular/core';
import { BehaviorSubject, asyncScheduler } from 'rxjs';
import {  CursoDomainEntity } from 'src/app/domain/entities/curso.entity.domain';
import {  CursoService } from 'src/app/domain/services/curso.service.domain';

@Injectable({
  providedIn: 'root',
})
export class GetAllCursoUseCase {
  private status: CursoDomainEntity[] = [];

  public statusEmmit: BehaviorSubject<CursoDomainEntity[]> = new BehaviorSubject<
  CursoDomainEntity[]
  >(this.status);

  constructor(private cursoservice: CursoService) {}

  execute = () => {
    if (this.statusEmmit.observed && !this.statusEmmit.closed) {
      this.cursoservice.getAll().subscribe({
        next: (value: CursoDomainEntity[]) => {
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
