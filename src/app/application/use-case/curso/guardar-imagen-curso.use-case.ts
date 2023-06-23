import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CursoService } from 'src/app/domain/services/curso.service.domain';
import { ImagenCursoDto } from 'src/app/infrastructure/dto/create/guardar-imagen-curso.dto';

@Injectable({
  providedIn: 'root',
})
export class GuardarImagenCursoUseCase {
  constructor(private cursoService: CursoService) {}

  execute(param: FormData): Observable<string> {
    return this.cursoService.saveImagen(param);
  }
}
