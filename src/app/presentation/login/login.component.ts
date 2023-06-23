import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUpDateUser } from 'src/app/domain/interfaces/update-user.interface.domain';
import { loginUseCaseProviders } from 'src/app/infrastructure/delegate/delegete-login/delegate-login.infrastructure';
import { SweetAlert } from '../shared/sweetAlert/sweet-alert.presentation';
import { usuarioUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-usuario/delegate-usuario.infrastructure';
import { UsuarioService } from 'src/app/domain/services/usuario.service.domain';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignInDto } from 'src/app/infrastructure/dto/create/sign-in.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  delegateLogin = loginUseCaseProviders;
  delegateUsuario = usuarioUseCaseProviders;

  formLogin = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    clave: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  sweet = new SweetAlert();
  user: SignInDto = {} as SignInDto;
  updateUser: IUpDateUser = {} as IUpDateUser;

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly router: Router
  ) {}
  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }

  signIn() {
    this.user = this.formLogin.getRawValue() as SignInDto;

    this.delegateUsuario.signInUsuarioUseCaseProvider
      .useFactory(this.usuarioService)
      .execute(this.user)
      .subscribe({
        next: (response: string) => {
          localStorage.setItem('token', response);
          this.sweet.toFire('Bienvenido', 'Ingreso Exitoso', 'success');
          this.delegateLogin.hasUserUseCaseProvider.useFactory().execute();
          this.delegateLogin.hasTokenUserUseCaseUseProvider.useFactory().execute();
          this.delegateLogin.hasRolUseCaseProvider.useFactory(this.usuarioService).execute();
          if(localStorage.getItem('redirect') != null){
            this.router.navigate([localStorage.getItem('redirect')]);
            localStorage.removeItem('redirect');
          }else
          {
            this.router.navigate([`curso/get-all`]);
          }
        },
        error: (err: Error) => {
          this.sweet.toFire(
            'Vuelva a intentarlo',
            'Se produjo un error',
            'error'
          );
        },
      });
  }
  google() {}
  registrarse() {
    this.router.navigate([`/usuario/registrar`]);
  }
  generarClave(){
    const email = this.formLogin.get('email')?.value;

    //
    //editar contraseña de usuario
    //enviar por correo la nueva contraseña
  }
}
