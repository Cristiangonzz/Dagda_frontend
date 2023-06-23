import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { MembresiaUsuarioDomainEntity } from 'src/app/domain/entities/membresia-usuario.entity.domain';
import { MembresiaUsuarioService } from 'src/app/domain/services/membresia-usuario.service.domain';
import { CrearMembresiaUsuarioDto } from '../../dto/create/create-membresia-usuario.dto';

@Injectable({
  providedIn: 'root',
})
export class MembresiaUsuarioImplementationService extends MembresiaUsuarioService {
  URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    super();
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  create(MembresiaUsuario: CrearMembresiaUsuarioDto): Observable<MembresiaUsuarioDomainEntity> {
    return this.http.post<MembresiaUsuarioDomainEntity>(
      `${this.URL}/membresia-usuario`,
      MembresiaUsuario,
      this.httpOptions
    );
  }

  delete(MembresiaUsuarioId: string): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.URL}/membresia-usuario/delete/${MembresiaUsuarioId}`,
      this.httpOptions
    );
  }
  get(MembresiaUsuarioId: string): Observable<MembresiaUsuarioDomainEntity> {
    return this.http.get<MembresiaUsuarioDomainEntity>(
      `${this.URL}/membresia-usuario/getId/${MembresiaUsuarioId}`,
      this.httpOptions
    );
  }
  getAll(): Observable<MembresiaUsuarioDomainEntity[]> {
    return this.http.get<MembresiaUsuarioDomainEntity[]>(
      `${this.URL}/membresia-usuario`,
      this.httpOptions
    );
  }
  getByName(nombre: string): Observable<MembresiaUsuarioDomainEntity> {
    return this.http.get<MembresiaUsuarioDomainEntity>(
      `${this.URL}/membresia-usuario/getNombre/${nombre}`,
      this.httpOptions
    );
  }
}
