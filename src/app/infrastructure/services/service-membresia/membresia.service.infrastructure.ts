import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { MembresiaService } from 'src/app/domain/services/membresia.service.domain';
import { CrearMembresiaDto } from '../../dto/create/create-membresia.dto';
import { MembresiaDomainEntity } from 'src/app/domain/entities/membresia.entity.domain';
import { UpdateMembresiaDto } from '../../dto/create/update-membresia.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MembresiaImplementationService extends MembresiaService {
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
  create(Membresia: CrearMembresiaDto): Observable<MembresiaDomainEntity> {
    return this.http.post<MembresiaDomainEntity>(
      `${this.URL}/membresia`,
      Membresia,
      this.httpOptions
    );
  }
  update(
    nombre: string,
    Membresia: UpdateMembresiaDto
  ): Observable<MembresiaDomainEntity> {
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
