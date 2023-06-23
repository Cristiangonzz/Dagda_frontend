import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  Pipe,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { SweetAlert } from '../../shared/sweetAlert/sweet-alert.presentation';
import { loginUseCaseProviders } from 'src/app/infrastructure/delegate/delegete-login/delegate-login.infrastructure';
import { CursoDomainEntity } from 'src/app/domain/entities/curso.entity.domain';
import { cursoUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-curso/delegate-course.infrastructure';
import { CursoService } from 'src/app/domain/services/curso.service.domain';
import { inscripcionUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-inscripcion/delegate-inscripcion.infrastructure';
import { InscripcionService } from 'src/app/domain/services/inscripcion.service.domain';
import { IUsuarioTokenDomain } from 'src/app/domain/interfaces/usuario.token.interface.domain';
import { UsuarioService } from 'src/app/domain/services/usuario.service.domain';
import { IUsuarioCursoInscripcionDomain } from 'src/app/domain/interfaces/find-usuario-curso-inscripcion.inteface.domain';

@Component({
  selector: 'app-get-curso',
  templateUrl: './get-curso.component.html',
  styleUrls: ['./get-curso.component.css'],
})
export class GetCursoComponent implements OnInit, AfterViewInit {
  curso!: CursoDomainEntity;
  delegateCurso = cursoUseCaseProviders;
  delegateInscricion = inscripcionUseCaseProviders;
  delegateLogin = loginUseCaseProviders;
  sweet = new SweetAlert();
  rol: boolean = false;
  usuarioLogeado: boolean = false;
  selected!: CursoDomainEntity;
  suscription!: Subscription;

  tituloCurso: string = '';
  usuarioActual: string = '';

  suscripto: boolean = false;

  constructor(
    private cursoService: CursoService,
    private usuarioService: UsuarioService,
    private inscripcionService: InscripcionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }
 
  ngOnInit() {
    this.actualizarCarrito();
    this.delegateLogin.hasUserUseCaseProvider.useFactory().execute();
    this.delegateLogin.hasUserUseCaseProvider
      .useFactory()
      .statusEmmit.subscribe({
        next: (value: boolean) => {
          this.usuarioLogeado = value;
        },
      });

    this.getCurso();
    this.delegateLogin.hasRolUseCaseProvider
      .useFactory(this.usuarioService)
      .execute();
    this.delegateLogin.hasRolUseCaseProvider
      .useFactory(this.usuarioService)
      .statusRolEmmit.subscribe({
        next: (value: number) => {
          if (value == 1) {
            this.rol = true;
          }
          if (value == 0) {
            this.rol = false;
          }
        },
      });
  }

  getCurso() {
    
    const titulo = this.activatedRoute.snapshot.params['titulo'];
    this.getUsuario();
    this.actualizarUsuarioInscripto();

    // this.getInscripcion(this.usuarioActual, titulo);
    this.delegateCurso.GetCursoByNameUseCaseProvider.useFactory(
      this.cursoService
    )
      .execute(titulo)
      .subscribe({
        next: (value: CursoDomainEntity) => {
          this.curso = value;
        
        },
        error: () => {
          this.sweet.toFire('Curso', 'Error al Obtener Curso', 'error');
          this.router.navigate(['/curso/get-all']);
        },
      });
  }

  inscribirUsuario(curso: CursoDomainEntity) {
    if (this.usuarioLogeado) {
      this.router.navigate([`/usuario/inscribir/${curso.titulo}`]);
      // this.agregarCursoCarrito(curso);
    } else {
      localStorage.setItem('redirect', `/curso/get/${curso.titulo}`);
      this.router.navigate([`/login/sign-in`]);
    }
  }

  actualizarCarrito() {
    this.delegateCurso.AgregarCursoCarritoUseCaseProvider.useFactory(
      this.inscripcionService
    ).execute();
  }
  carrito(){
    this.router.navigate(['/carrito/canasta']);
  }
  actualizarUsuarioInscripto() {
    this.suscripto = false;
    this.delegateCurso.AgregarCursoCarritoUseCaseProvider.useFactory(
      this.inscripcionService
    ).cursosCarritoEmmit.subscribe({
      next: (value: CursoDomainEntity[]) => {
        if(value){
          value.forEach((curso) => {
            if (curso.titulo == this.curso.titulo) {
              this.suscripto = true;
            }
          }
          );
        }
      }
    });
  }




  getUsuario() {
    this.delegateLogin.hasTokenUserUseCaseUseProvider.useFactory().execute();
    this.delegateLogin.hasTokenUserUseCaseUseProvider
      .useFactory()
      .statusTokenEmmit.subscribe({
        next: (value: IUsuarioTokenDomain) => {
          this.usuarioActual = value.usuario?.email!;
        },
      });
  }
  
}
