import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CursoService } from 'src/app/domain/services/curso.service.domain';
import { CrearCursoDto } from '../../dto/create/create-curso.dto';
import { CursoDomainEntity } from 'src/app/domain/entities/curso.entity.domain';
import { UpdateCursoDto } from '../../dto/create/update-curso.dto';
import { ImagenCursoDto } from '../../dto/create/guardar-imagen-curso.dto';

@Injectable({
  providedIn: 'root',
})
export class CursoImplementationService extends CursoService {
  URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    super();
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  create(Curso: CrearCursoDto): Observable<CursoDomainEntity> {
    return this.http.post<CursoDomainEntity>(
      `${this.URL}/curso/create`,
      Curso,
      this.httpOptions
    );
  }
  update(id: string, Curso: UpdateCursoDto): Observable<CursoDomainEntity> {
    return this.http.put<CursoDomainEntity>(
      `${this.URL}/curso/update/${id}`,
      Curso,
      this.httpOptions
    );
  }
  delete(CursoId: string): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.URL}/curso/delete/${CursoId}`,
      this.httpOptions
    );
  }
  get(CursoId: string): Observable<CursoDomainEntity> {
    return this.http.get<CursoDomainEntity>(
      `${this.URL}/curso/getId/${CursoId}`,
      this.httpOptions
    );
  }
  getAll(): Observable<CursoDomainEntity[]> {
    return this.http.get<CursoDomainEntity[]>(
      `${this.URL}/curso`,
      this.httpOptions
    );
  }
  getByName(titulo: string): Observable<CursoDomainEntity> {
    return this.http.get<CursoDomainEntity>(
      `${this.URL}/curso/getTitulo/${titulo}`,
      this.httpOptions
    );
  }

  saveImagen(imagen: FormData): Observable<any> {
    return this.http.post<any>(
      `${this.URL}/curso/upload`,
      imagen,
      this.httpOptions
    );
  }
  getimagen(filname: string): Observable<any> {
    
    return this.http
      .get(`${this.URL}/curso/images/${filname}`, { responseType: 'blob' })
      .pipe(
        map((res: Blob) => {
          const objectURL = URL.createObjectURL(res);
          return objectURL;
        })
      );
  }
}
