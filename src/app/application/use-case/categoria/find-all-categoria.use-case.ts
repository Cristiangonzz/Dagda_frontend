import { BehaviorSubject, asyncScheduler } from 'rxjs';
import { Injectable } from '@angular/core';
import { CategoriaService } from 'src/app/domain/services/categoria.service.domain';
import { CategoriaDomainEntity } from 'src/app/domain/entities/categoria.entity.domain';

@Injectable({
  providedIn: 'root',
})
export class GetAllCategoriaUseCase {
  private status: CategoriaDomainEntity[] = [];

  public statusEmmit: BehaviorSubject<CategoriaDomainEntity[]> = new BehaviorSubject<
    CategoriaDomainEntity[]
  >(this.status);

  constructor(private categoriaService: CategoriaService) {}

  execute = () => {
    if (this.statusEmmit.observed && !this.statusEmmit.closed) {
      this.categoriaService.getAll().subscribe({
        next: (value: CategoriaDomainEntity[]) => {
          this.status = value;
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
