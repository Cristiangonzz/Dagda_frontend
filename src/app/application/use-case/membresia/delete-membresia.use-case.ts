import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MembresiaService } from 'src/app/domain/services/membresia.service.domain';

@Injectable({
  providedIn: 'root',
})
export class DeleteMembresiaUseCase {
  constructor(private membresiaService: MembresiaService) {}

  execute(data: string): Observable<boolean> {
    return this.membresiaService.delete(data);
  }
}
