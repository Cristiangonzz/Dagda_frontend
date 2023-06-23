import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { InscripcionService } from 'src/app/domain/services/inscripcion.service.domain';

@Injectable({
  providedIn: 'root',
})
export class DeleteInscripcionUseCase {
  constructor(private inscripcionService: InscripcionService) {}

  execute(data: string): Observable<boolean> {
    return this.inscripcionService.delete(data);
  }
}
