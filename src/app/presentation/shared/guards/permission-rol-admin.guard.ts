import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UsuarioService } from 'src/app/domain/services/usuario.service.domain';
import { loginUseCaseProviders } from 'src/app/infrastructure/delegate/delegete-login/delegate-login.infrastructure';

@Injectable({
  providedIn: 'root',
})
export class PermissionRolAdminGuard implements CanActivate {
  provider = loginUseCaseProviders;
  constructor(
    private readonly router: Router,
    private readonly usuarioService: UsuarioService
    ) {}
  canActivate(): Observable<boolean> {
    return this.provider.hasRolUseCaseProvider
      .useFactory(this.usuarioService).statusRolEmmit
      .pipe(
        map((status: number) => {
          if (status === 1) {
            return true;
          } else {
            this.router.navigate([`home`]);
            return false;
          }
        })
      );
  }
}
