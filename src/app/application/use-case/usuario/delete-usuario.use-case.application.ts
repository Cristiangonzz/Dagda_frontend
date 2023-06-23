import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/domain/services/usuario.service.domain';

@Injectable({
  providedIn: 'root',
})
export class DeleteUsuarioUseCase {
  constructor(private usuarioService: UsuarioService) {}

  execute(id: string): Observable<boolean> {
    return this.usuarioService.delete(id);
  }
}
