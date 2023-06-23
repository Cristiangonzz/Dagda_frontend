import { BehaviorSubject, asyncScheduler, map, switchMap, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { MembresiaUsuarioService } from 'src/app/domain/services/membresia-usuario.service.domain';
import { IMembresiaUsuarioDomain } from 'src/app/domain/interfaces/membresia-usuario.inteface.domain';
import { MembresiaService } from 'src/app/domain/services/membresia.service.domain';
import { IPerteneceMembresiaUsuarioDomain } from 'src/app/domain/interfaces/pertenece-membresia-usuario.inteface.domain';
import { membresiaUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-membresia/delegate-membresia.infrastructure';
import { membresiaUsuarioUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-membresia-usuario/delegate-membresia-usuario.infrastructure';
import { loginUseCaseProviders } from 'src/app/infrastructure/delegate/delegete-login/delegate-login.infrastructure';
import { IUsuarioTokenDomain } from 'src/app/domain/interfaces/usuario.token.interface.domain';
import { MembresiaDomainEntity } from 'src/app/domain/entities/membresia.entity.domain';

@Injectable({
  providedIn: 'root',
})
export class PertenecerMembresiaUsuarioUseCase {
  delegateMembresia = membresiaUseCaseProviders;
  delegateMembresiaUsuario = membresiaUsuarioUseCaseProviders;
  delegateLogin = loginUseCaseProviders;
  usuarioActual!: string;
  membresiaUsuario = {} as MembresiaDomainEntity[];

  private membresiaAdquirida: MembresiaDomainEntity[] =
    {} as MembresiaDomainEntity[];

  public membresiaAdquiridaEmmit: BehaviorSubject<
    MembresiaDomainEntity[]
  > = new BehaviorSubject<MembresiaDomainEntity[]>(
    this.membresiaAdquirida
  );
  constructor(
    private membresiaUsuarioService: MembresiaUsuarioService,
    private membresiaService: MembresiaService
  ) {}

  execute(): Observable<MembresiaDomainEntity[]> {
    if (
      this.membresiaAdquiridaEmmit.observed &&
      !this.membresiaAdquiridaEmmit.closed
    ) {
      console.log("usuario actual");
      return this.delegateLogin.hasTokenUserUseCaseUseProvider
        .useFactory()
        .execute()
        .pipe(
          switchMap((value: IUsuarioTokenDomain) => {
            this.usuarioActual = value.usuario?.email!;
            console.log("usuario actual");

            return this.membresiaService.getAll().pipe(
              switchMap((value: MembresiaDomainEntity[]) => {
                this.membresiaUsuario = value;
                console.log("Aca retorno todas las membresia",this.membresiaUsuario);
                
  
                return this.membresiaUsuarioService.getAll().pipe(
                  map((value2: IMembresiaUsuarioDomain[]) => {
                    this.membresiaUsuario.forEach(
                      (membresia: MembresiaDomainEntity) => {
                        const membresiaUsuario = value2.find(
                          (membresiaUsuario: IMembresiaUsuarioDomain) =>
                            membresia.nombre ===
                              membresiaUsuario.membresia.nombre &&
                            membresiaUsuario.usuario.email === this.usuarioActual
                        );
  
                        membresia.vigente = !!membresiaUsuario;
                      }
                    );
                  }),
                  map(() => {

                    this.membresiaAdquirida = this.membresiaUsuario;
                    this.membresiaAdquiridaEmmit.next(this.membresiaAdquirida);
                   return  this.membresiaUsuario;
                  })
                );
              })
            );
          })
        );
    } else {
      return this.membresiaAdquiridaEmmit.asObservable();
    }
  }
}
