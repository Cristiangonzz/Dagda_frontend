import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/domain/services/usuario.service.domain';
import { RegistrarUsuarioDto } from '../../dto/create/create-usuario.dto';
import { UsuarioDomainEntity } from 'src/app/domain/entities/usuario.entity.domain';
import { UpdateUsuarioDto } from '../../dto/create/update-usuario.dto';
import { SignInDto } from '../../dto/create/sign-in.dto';

@Injectable({
  providedIn: 'root',
})
export class UsuarioImplementationService extends UsuarioService {
 
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
  create(Usuario: RegistrarUsuarioDto): Observable<UsuarioDomainEntity> {
    return this.http.post<UsuarioDomainEntity>(
      `${this.URL}/usuario`,
      Usuario,
      this.httpOptions
    );
  }
  update(email: string, Usuario: UpdateUsuarioDto): Observable<UsuarioDomainEntity> {
    return this.http.put<UsuarioDomainEntity>(
      `${this.URL}/usuario/update/${email}`,
      Usuario,
      this.httpOptions
    );
  }
  delete(email: string): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.URL}/usuario/delete/${email}`,
      this.httpOptions
    );
  }
  get(UsuarioId: string): Observable<UsuarioDomainEntity> {
    return this.http.get<UsuarioDomainEntity>(
      `${this.URL}/usuario/getId/${UsuarioId}`,
      this.httpOptions
    );
  }
  getAll(): Observable<UsuarioDomainEntity[]> {
    return this.http.get<UsuarioDomainEntity[]>(
      `${this.URL}/usuario`,
      this.httpOptions
    );
  }
  getByName(email: string): Observable<UsuarioDomainEntity> {
    return this.http.get<UsuarioDomainEntity>(
      `${this.URL}/usuario/getEmail/${email}`,
      this.httpOptions
    );
  }

  signIn(usuario: SignInDto): Observable<string> {
    return this.http.post(
      `${this.URL}/usuario/signin`,usuario,{responseType: 'text'}
    );
  }
}
