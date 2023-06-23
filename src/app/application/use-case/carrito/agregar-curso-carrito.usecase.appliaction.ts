import { Injectable } from '@angular/core';
import { BehaviorSubject, asyncScheduler, tap } from 'rxjs';
import {  CursoDomainEntity } from 'src/app/domain/entities/curso.entity.domain';
import { InscripcionDomainEntity } from 'src/app/domain/entities/inscripcion.entity.domain';
import { IUsuarioTokenDomain } from 'src/app/domain/interfaces/usuario.token.interface.domain';
import { InscripcionService } from 'src/app/domain/services/inscripcion.service.domain';
import { inscripcionUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-inscripcion/delegate-inscripcion.infrastructure';
import { loginUseCaseProviders } from 'src/app/infrastructure/delegate/delegete-login/delegate-login.infrastructure';

@Injectable({
  providedIn: 'root',
})
export class AgregarCursoCarritoUseCase {
  delegateLogin = loginUseCaseProviders;
  emailUsuario!: string;
  constructor(private inscripcionService: InscripcionService) {}
  private cursoCarrito: CursoDomainEntity [] =  [];

  public cursosCarritoEmmit: BehaviorSubject<CursoDomainEntity[]> = 
  new BehaviorSubject<CursoDomainEntity[]>(this.cursoCarrito);

  
  execute(): void {
    if (this.cursosCarritoEmmit.observed && !this.cursosCarritoEmmit.closed) {
      this.delegateLogin
      .hasTokenUserUseCaseUseProvider.useFactory()
      .statusTokenEmmit.subscribe((data: IUsuarioTokenDomain) => {
        this.emailUsuario = data.usuario?.email!;
  
        this.inscripcionService.getAll().pipe(
          tap((data: InscripcionDomainEntity[]) => {
            const cursosUsuario = data
              .filter((inscripcion: InscripcionDomainEntity) => inscripcion.usuario?.email === this.emailUsuario)
              .map((inscripcion: InscripcionDomainEntity) => inscripcion.curso!);
            
            console.log('Cursos del usuario:', cursosUsuario);
            this.cursoCarrito = cursosUsuario;
            this.cursosCarritoEmmit.next(this.cursoCarrito);
          })
        ).subscribe(
          {
            next: (data: InscripcionDomainEntity[]) => {
              console.log("salio todo bien");
            },
            error: (error: any) => {
              console.log(error);
            }
          }
        );

      });
    }
  }
}
