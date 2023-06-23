import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { CursoService } from 'src/app/domain/services/curso.service.domain';
import { CrearCursoDto } from '../../dto/create/create-curso.dto';
import { CursoDomainEntity } from 'src/app/domain/entities/curso.entity.domain';
import { UpdateCursoDto } from '../../dto/create/update-curso.dto';
import { MembresiaService } from 'src/app/domain/services/membresia.service.domain';
import { CrearMembresiaDto } from '../../dto/create/create-membresia.dto';
import { MembresiaDomainEntity } from 'src/app/domain/entities/membresia.entity.domain';
import { UpdateMembresiaDto } from '../../dto/create/update-membresia.dto';

@Injectable({
  providedIn: 'root',
})
export class MembresiaImplementationService extends MembresiaService {
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
  create(Membresia: CrearMembresiaDto): Observable<MembresiaDomainEntity> {
    return this.http.post<MembresiaDomainEntity>(
      `${this.URL}/membresia`,
      Membresia,
      this.httpOptions
    );
  }
  update(nombre: string, Membresia: UpdateMembresiaDto): Observable<MembresiaDomainEntity> {
    return this.http.put<MembresiaDomainEntity>(
      `${this.URL}/membresia/update/${nombre}`,
      Membresia,
      this.httpOptions
    );
  }
  delete(MembresiaId: string): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.URL}/membresia/delete/${MembresiaId}`,
      this.httpOptions
    );
  }
  get(MembresiaId: string): Observable<MembresiaDomainEntity> {
    return this.http.get<MembresiaDomainEntity>(
      `${this.URL}/membresia/getId/${MembresiaId}`,
      this.httpOptions
    );
  }
  getAll(): Observable<MembresiaDomainEntity[]> {
    return this.http.get<MembresiaDomainEntity[]>(
      `${this.URL}/membresia`,
      this.httpOptions
    );
  }
  getByName(nombre: string): Observable<MembresiaDomainEntity> {
    return this.http.get<MembresiaDomainEntity>(
      `${this.URL}/membresia/getNombre/${nombre}`,
      this.httpOptions
    );
  }
}
