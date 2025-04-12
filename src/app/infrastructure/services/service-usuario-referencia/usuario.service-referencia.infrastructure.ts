import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioReferenciaService } from 'src/app/domain/services/usuario-referente.service.domain';
import { UsuarioReferenciaDomainEntity } from 'src/app/domain/entities/usuario-referencia.entity.domain';
import { RegistrarUsuarioReferenciaDto } from '../../dto/create/create-usuario-referencia.dto';
import { UpdateUsuarioReferenciaDto } from '../../dto/create/update-usuario-referencia.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsuarioReferenciaImplementationService extends UsuarioReferenciaService {
  URL ='https://backend-academy-cristianuruuy-dev.apps.rm2.thpm.p1.openshiftapps.com';

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
  create(
    referencia: RegistrarUsuarioReferenciaDto
  ): Observable<UsuarioReferenciaDomainEntity> {
    return this.http.post<UsuarioReferenciaDomainEntity>(
      `${this.URL}/usuarioReferencia`,
      referencia,
      this.httpOptions
    );
  }
  update(
    email: string,
    Usuario: UpdateUsuarioReferenciaDto
  ): Observable<UsuarioReferenciaDomainEntity> {
    return this.http.put<UsuarioReferenciaDomainEntity>(
      `${this.URL}/usuarioReferencia/update/${email}`,
      Usuario,
      this.httpOptions
    );
  }
  delete(email: string): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.URL}/usuarioReferencia/delete/${email}`,
      this.httpOptions
    );
  }
  get(UsuarioId: string): Observable<UsuarioReferenciaDomainEntity> {
    return this.http.get<UsuarioReferenciaDomainEntity>(
      `${this.URL}/usuarioReferencia/getId/${UsuarioId}`,
      this.httpOptions
    );
  }
  getAll(): Observable<UsuarioReferenciaDomainEntity[]> {
    return this.http.get<UsuarioReferenciaDomainEntity[]>(
      `${this.URL}/usuarioReferencia`,
      this.httpOptions
    );
  }
  getByName(email: string): Observable<UsuarioReferenciaDomainEntity> {
    return this.http.get<UsuarioReferenciaDomainEntity>(
      `${this.URL}/usuarioReferencia/getEmail/${email}`,
      this.httpOptions
    );
  }
}
