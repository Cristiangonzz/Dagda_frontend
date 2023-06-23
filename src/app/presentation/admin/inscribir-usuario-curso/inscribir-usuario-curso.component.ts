import { Component, OnInit } from '@angular/core';
import { inscripcionUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-inscripcion/delegate-inscripcion.infrastructure';
import { loginUseCaseProviders } from 'src/app/infrastructure/delegate/delegete-login/delegate-login.infrastructure';
import { CrearInscripcionDto } from 'src/app/infrastructure/dto/create/create-inscripcion.dto';
import { SweetAlert } from '../../shared/sweetAlert/sweet-alert.presentation';
import { ActivatedRoute, Router } from '@angular/router';
import { InscripcionService } from 'src/app/domain/services/inscripcion.service.domain';
import { IUsuarioTokenDomain } from 'src/app/domain/interfaces/usuario.token.interface.domain';
import { InscripcionDomainEntity } from 'src/app/domain/entities/inscripcion.entity.domain';
import { MensajeCorreoDomainEntity } from 'src/app/domain/entities/mensaje-correo.entity.domain';
import { Subject } from 'rxjs';
import { IUsuarioDomain } from 'src/app/domain/interfaces/usuario.interface.domain';
import { nodeMailerUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-nodemailer/nodemailer.delegate.infrastructure';
import { NodeMailerService } from 'src/app/domain/services/nodemailer.service.domain';
import { SendEmailDto } from 'src/app/infrastructure/dto/send-email.dto';
import { cursoUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-curso/delegate-course.infrastructure';
import { CursoDomainEntity } from 'src/app/domain/entities/curso.entity.domain';
import { IUsuarioCursoInscripcionDomain } from '../../../domain/interfaces/find-usuario-curso-inscripcion.inteface.domain';

@Component({
  selector: 'app-inscribir-usuario-curso',
  templateUrl: './inscribir-usuario-curso.component.html',
  styleUrls: ['./inscribir-usuario-curso.component.css'],
})
export class InscribirUsuarioCursoComponent implements OnInit {
  delegateInscricion = inscripcionUseCaseProviders;
  delegateNodeMailer = nodeMailerUseCaseProviders;
  delegateCurso = cursoUseCaseProviders;
  delegateLogin = loginUseCaseProviders;
  sweet = new SweetAlert();
  inscripcion: CrearInscripcionDto = {
    curso: '',
    usuario: '',
  };
  dataUsuario: IUsuarioDomain = {} as IUsuarioDomain;

  constructor(
    private readonly inscripcionService: InscripcionService,
    private readonly nodeMailerService: NodeMailerService,
    private router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUsuario();
    if (this.activatedRoute.snapshot.params['tituloCurso'] == null) {
      this.router.navigate(['/curso/get-all']);
    } else {
      this.inscripcion.curso =
        this.activatedRoute.snapshot.params['tituloCurso'];
      this.inscribirUsuario();
    }
  }

  inscribirUsuario() {
    this.delegateInscricion.CreateInscripcionUseCaseProvider.useFactory(
      this.inscripcionService
    )
      .execute(this.inscripcion)
      .subscribe({
        next: (data: InscripcionDomainEntity) => {
          this.agregarCursoCarrito(data.curso as CursoDomainEntity);
          this.sendMail();
          const dato : IUsuarioCursoInscripcionDomain = {
            email: data.usuario?.email as string,
            titulo: data.curso?.titulo as string,
          }
          this.delegateInscricion.getInscripcionUsuarioCursoUseCaseProvider
          .useFactory(this.inscripcionService)
          .execute(dato);
          this.router.navigate([`/curso/get/${this.inscripcion.curso}`]);
          
        },
        error: () => {
          this.sweet.toFire('Curso', 'Error en la Inscripcion', 'error');
        },
        complete: () => {
         
          this.router.navigate([`/curso/get/${this.inscripcion.curso}`]);
        },
      });
  }
  agregarCursoCarrito(curso : CursoDomainEntity){
    this.delegateCurso
    .AgregarCursoCarritoUseCaseProvider
    .useFactory(this.inscripcionService).execute();
  }
  getUsuario() {
    this.delegateLogin.hasTokenUserUseCaseUseProvider
      .useFactory()
      .execute()
      .subscribe({
        next: (value: IUsuarioTokenDomain) => {
          this.inscripcion.usuario = value.usuario?.email as string;
          this.dataUsuario = value.usuario as IUsuarioDomain;
        },
        error: () => {
          this.sweet.toFire(
            'Usuario Incorrecto',
            'Usuario no encontrado',
            'error'
          );
        },
      });
  }
  sendMail() {
    const data: SendEmailDto = {
      nombreTo: `${this.dataUsuario.primer_nombre} ${this.dataUsuario.primer_apellido}`,
      emailTo: this.dataUsuario.email,

      nombreFrom: 'Academia Dagda',
      emailFrom: 'academiadagda@gmail.com',

      subject: 'Inscripcion a Curso',
      body: `<b>Felicitaciones se inscribio al curso : ${this.inscripcion.curso} , le dejamos el link para abonar antes que comienze el curso </b>`,
    };
    this.delegateNodeMailer.nodeMailerUseCaseProvider
      .useFactory(this.nodeMailerService)
      .execute(data)
      .subscribe({
        next: (value: MensajeCorreoDomainEntity) => {
          
        },
        error: () => {
          this.sweet.toFire(
            'Correo Incorrecto',
            'Correo no encontrado',
            'error'
          );
        },
      });
  }
}
