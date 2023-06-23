import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaDomainEntity } from 'src/app/domain/entities/categoria.entity.domain';
import { CategoriaService } from 'src/app/domain/services/categoria.service.domain';
import { CrearCategoriaDto } from '../../dto/create/create-categoria.dto';
import { UpdateCategoriaDto } from '../../dto/create/update-categoria.dto';

@Injectable({
  providedIn: 'root',
})
export class CategoriaImplementationService extends CategoriaService {
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

  create(data: CrearCategoriaDto): Observable<CategoriaDomainEntity> {
    return this.http.post<CategoriaDomainEntity>(
      `${this.URL}/categoria`,
      data,
      this.httpOptions
    );
  }
  getByName(nombre: string): Observable<CategoriaDomainEntity> {
    return this.http.get<CategoriaDomainEntity>(
      `${this.URL}/categoria/get-nombre/${nombre}`,
      this.httpOptions
    );
  }
  update(nombre: string, data: UpdateCategoriaDto): Observable<CategoriaDomainEntity> {
    return this.http.put<CategoriaDomainEntity>(
      `${this.URL}/categoria/update/${nombre}`,
      data,
      this.httpOptions
    );
  }
  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.URL}/categoria/delete/${id}`,
      this.httpOptions
    );
  }
  get(id: string): Observable<CategoriaDomainEntity> {
    return this.http.get<CategoriaDomainEntity>(
      `${this.URL}/Route/${id}`,
      this.httpOptions
    );
  }
  getAll(): Observable<CategoriaDomainEntity[]> {
    return this.http.get<CategoriaDomainEntity[]>(`${this.URL}/categoria`, this.httpOptions);
  }
}
