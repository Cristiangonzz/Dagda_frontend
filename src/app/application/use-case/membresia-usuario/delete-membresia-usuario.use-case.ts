import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MembresiaUsuarioService } from 'src/app/domain/services/membresia-usuario.service.domain';

@Injectable({
  providedIn: 'root',
})
export class DeleteMembresiaUsuarioUseCase {
  constructor(private membresiaUsuarioService: MembresiaUsuarioService) {}

  execute(data: string): Observable<boolean> {
    return this.membresiaUsuarioService.delete(data);
  }
}
