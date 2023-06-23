import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, tap } from 'rxjs';
import { CrearInscripcionDto } from '../../dto/create/create-inscripcion.dto';
import { InscripcionDomainEntity } from 'src/app/domain/entities/inscripcion.entity.domain';
import { InscripcionService } from 'src/app/domain/services/inscripcion.service.domain';
import { IUsuarioCursoInscripcionDomain } from 'src/app/domain/interfaces/find-usuario-curso-inscripcion.inteface.domain';

@Injectable({
  providedIn: 'root',
})
export class InscripcionImplementationService extends InscripcionService {
  
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

  create(Curso: CrearInscripcionDto): Observable<InscripcionDomainEntity> {
    return this.http.post<InscripcionDomainEntity>(
      `${this.URL}/inscripcion`,
      Curso,
      this.httpOptions
    );
  }
  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.URL}/inscripcion/delete/${id}`,
      this.httpOptions
    );
  }
  override get(id: string): Observable<InscripcionDomainEntity> {
    throw new Error('Method not implemented.');
  }
  getAll(): Observable<InscripcionDomainEntity[]> {
    return this.http.get<InscripcionDomainEntity[]>(
      `${this.URL}/inscripcion`,
      this.httpOptions
    );
  }
  override getByName(id: string): Observable<InscripcionDomainEntity> {
    throw new Error('Method not implemented.');
  }

  FindUsuarioCursoInscripcion(data: IUsuarioCursoInscripcionDomain): Observable<InscripcionDomainEntity[]> {
    return this.http.get<InscripcionDomainEntity[]>(
      `${this.URL}/inscripcion/getUsuarioCurso/${data.email}/${data.titulo}`,
      this.httpOptions
    );

    

  }
}
