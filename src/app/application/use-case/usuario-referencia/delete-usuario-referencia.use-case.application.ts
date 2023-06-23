import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioReferenciaService } from 'src/app/domain/services/usuario-referente.service.domain';

@Injectable({
  providedIn: 'root',
})
export class DeleteUsuarioReferenciaUseCase {
  constructor(private usuarioReferenciaService: UsuarioReferenciaService) {}

  execute(id: string): Observable<boolean> {
    return this.usuarioReferenciaService.delete(id);
  }
}
