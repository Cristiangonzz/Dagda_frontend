import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioDomainEntity } from 'src/app/domain/entities/usuario.entity.domain';
import { UsuarioService } from 'src/app/domain/services/usuario.service.domain';
import { UpdateUsuarioDto } from 'src/app/infrastructure/dto/create/update-usuario.dto';
import { SweetAlert } from '../../shared/sweetAlert/sweet-alert.presentation';
import { loginUseCaseProviders } from 'src/app/infrastructure/delegate/delegete-login/delegate-login.infrastructure';
import { usuarioUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-usuario/delegate-usuario.infrastructure';
import { IUsuarioDomain } from 'src/app/domain/interfaces/usuario.interface.domain';
import { SendEmailDto } from 'src/app/infrastructure/dto/send-email.dto';
import { nodeMailerUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-nodemailer/nodemailer.delegate.infrastructure';
import { NodeMailerService } from 'src/app/domain/services/nodemailer.service.domain';
import { MensajeCorreoDomainEntity } from 'src/app/domain/entities/mensaje-correo.entity.domain';
import { usuarioReferenciaUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-usuario-referencia/delegate-usuario-referencia.infrastructure';
import { UsuarioReferenciaService } from 'src/app/domain/services/usuario-referente.service.domain';
import { UsuarioReferenciaDomainEntity } from 'src/app/domain/entities/usuario-referencia.entity.domain';
import { RegistrarUsuarioReferenciaDto } from 'src/app/infrastructure/dto/create/create-usuario-referencia.dto';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit, AfterViewInit {
  delegateLogin = loginUseCaseProviders;
  delegateUsuario = usuarioUseCaseProviders;
  delegateUsuarioReferencia = usuarioReferenciaUseCaseProviders;
  delegateNodeMailer = nodeMailerUseCaseProviders;

  formCrear = new FormGroup({
    primer_nombre: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    primer_apellido: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    telefono: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    usuario: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    clave: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  sweet = new SweetAlert();
  user: UsuarioDomainEntity = {} as UsuarioDomainEntity;
  usuarioReferente: string = '';
  updateUser: UpdateUsuarioDto = {} as UpdateUsuarioDto; //para actualizar usuario (foto)

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly usuarioReferenciaService: UsuarioReferenciaService,
    private readonly nodeMailerService: NodeMailerService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
   if(this.activateRoute.snapshot.params['id']){
     this.guardarReferente();
   }
    
  }

  ngAfterViewInit(): void {
    window.scrollTo(0, 0); // Renderizar hacia arriba de la pantalla
  }

  registrarUsuario() {
    this.delegateUsuario.createUsuarioUseCaseProvider
      .useFactory(this.usuarioService)
      .execute(this.user)
      .subscribe({
        next: (response: UsuarioDomainEntity) => {
          this.sweet.toFire(`${response.usuario}`, 'Cuenta Creada', 'success');
          if(this.usuarioReferente){
            console.log("dentro del if",this.usuarioReferente);
            this.crearReferencia(response.email);
          }
          this.router.navigate([`home`]);
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
  signUp() {
    this.user = this.formCrear.getRawValue() as UsuarioDomainEntity;
    const data: SendEmailDto = {
      nombreTo: `${this.user.primer_nombre} ${this.user.primer_apellido}`,
      emailTo: this.user.email,

      nombreFrom: 'Academia Dagda',
      emailFrom: 'academiadagda@gmail.com',

      subject: 'Inscripcion a Curso',
      body: `<b>Felicitaciones se registro en Academia Dagda , le damos la bienvenida!!</b>`,
    };
    this.delegateNodeMailer.nodeMailerUseCaseProvider
      .useFactory(this.nodeMailerService)
      .execute(data)
      .subscribe({
        next: (value: MensajeCorreoDomainEntity) => {
          this.registrarUsuario();
        },
        error: () => {
          this.sweet.toFire(
            'Correo Invalido',
            'Ingrese un correo valido',
            'error'
          );
        },
      });
  }
  guardarReferente() {
    this.delegateUsuario.getIdUsuarioUseCaseProvider
      .useFactory(this.usuarioService)
      .execute(this.activateRoute.snapshot.params['id'])
      .subscribe({
        next: (response: UsuarioDomainEntity) => {
          this.usuarioReferente = response.email;
          console.log(this.usuarioReferente);

        },
        error: (err: Error) => {
          this.sweet.toFire('Link Invalido', 'Vuelva a intentarlo', 'error');
        },
      });
     
  }

  crearReferencia(newUsuario: string){
    const dataReferencia : RegistrarUsuarioReferenciaDto = {
      usu_referente: this.usuarioReferente,
      usu_referido: newUsuario
    }
      console.log(dataReferencia);
    this.delegateUsuarioReferencia
    .createUsuarioReferenciaUseCaseProvider
    .useFactory(this.usuarioReferenciaService)
    .execute(dataReferencia).subscribe({
      next: (response: UsuarioReferenciaDomainEntity) => {
        this.sweet.toFire('Exito', 'Referencia creada', 'success');

      },
      error: (err: Error) => {
        this.sweet.toFire('Link Invalido', 'Vuelva a intentarlo', 'error');
      }

    })

  }
}
