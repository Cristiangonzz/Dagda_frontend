import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { UsuarioDomainEntity } from 'src/app/domain/entities/usuario.entity.domain';
import { IUsuarioTokenDomain } from 'src/app/domain/interfaces/usuario.token.interface.domain';
import { UsuarioService } from 'src/app/domain/services/usuario.service.domain';
import { usuarioUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-usuario/delegate-usuario.infrastructure';

@Injectable({
  providedIn: 'root',
})
export class HasRolUseCase {
  private delegateUsuario = usuarioUseCaseProviders;
  private helper = new JwtHelperService();
  private status: number = 0;
  public statusRolEmmit: BehaviorSubject<number> = new BehaviorSubject<number>(
    this.status
  );
  constructor(
    private readonly usuarioServicio: UsuarioService,
  ) {}

  execute(): Observable<number> {
   
    if (localStorage.getItem('token') !== null) {
      const token = localStorage.getItem('token');
      const tokenUser = token
        ? (this.helper.decodeToken(token) as IUsuarioTokenDomain)
        : undefined;
       this.delegateUsuario.getEmailUsuarioUseCaseProvider
        .useFactory(this.usuarioServicio)
          .execute(tokenUser?.usuario?.email!)
            .subscribe((usuario: UsuarioDomainEntity) => {
                console.log("El rol que tiene el usuario Actual",usuario);
                if (usuario.tipo_usuario == 1) {
                  this.status = 1;
                  this.statusRolEmmit.next(this.status);
                  return of(this.status);
                }
                if (usuario.tipo_usuario == 0) {
                  this.status = 0;
                  this.statusRolEmmit.next(this.status);
                  return of(this.status);
                }
                if (usuario.tipo_usuario == 2) {
                  this.status = 2;
                  this.statusRolEmmit.next(this.status);
                  return of(this.status);
                }
                if (usuario.tipo_usuario == 3) {
                  this.status = 3;
                  this.statusRolEmmit.next(this.status);
                  return of(this.status);
                }
                if (usuario.tipo_usuario == 4) {
                  this.status = 4;
                  this.statusRolEmmit.next(this.status);
                  return of(this.status);
                }
                if (usuario.tipo_usuario == 5) {
                  this.status = 5;
                  this.statusRolEmmit.next(this.status);
                  return of(this.status);
                }
                return of(this.status);
              })
            
    } else {
      this.status = -1;
      this.statusRolEmmit.next(this.status);
      return of(this.status);
    }
    return of(this.status);
  }
}
