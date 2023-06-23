import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CursoService } from 'src/app/domain/services/curso.service.domain';

@Injectable({
  providedIn: 'root',
})
export class DeleteCursoUseCase {
  constructor(private cursoService: CursoService) {}

  execute(data: string): Observable<boolean> {
    return this.cursoService.delete(data);
  }
}
