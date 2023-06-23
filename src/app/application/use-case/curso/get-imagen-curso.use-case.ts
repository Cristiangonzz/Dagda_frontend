import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CursoService } from 'src/app/domain/services/curso.service.domain';

@Injectable({
  providedIn: 'root',
})
export class GetImagenCursoUseCase {
  constructor(private cursoService: CursoService) {}

  execute(filname: string):Observable<any> {
    return this.cursoService.getimagen(filname);
  }
}
