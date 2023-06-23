import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { SweetAlert } from '../../shared/sweetAlert/sweet-alert.presentation';
import { loginUseCaseProviders } from 'src/app/infrastructure/delegate/delegete-login/delegate-login.infrastructure';
import { CursoDomainEntity } from 'src/app/domain/entities/curso.entity.domain';
import { cursoUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-curso/delegate-course.infrastructure';
import { CursoService } from 'src/app/domain/services/curso.service.domain';
import { UsuarioService } from 'src/app/domain/services/usuario.service.domain';
import { inscripcionUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-inscripcion/delegate-inscripcion.infrastructure';
import { InscripcionService } from 'src/app/domain/services/inscripcion.service.domain';
import { IUsuarioCursoInscripcionDomain } from 'src/app/domain/interfaces/find-usuario-curso-inscripcion.inteface.domain';
import { IUsuarioTokenDomain } from 'src/app/domain/interfaces/usuario.token.interface.domain';

@Component({
  selector: 'app-get-all-curso',
  templateUrl: './get-all-curso.component.html',
  styleUrls: ['./get-all-curso.component.css'],
})
export class GetAllCursoComponent implements OnInit, OnDestroy ,AfterViewInit  {
  courses!: CursoDomainEntity[];
  urlImagen!: string ;
  delegateCurso = cursoUseCaseProviders;
  delegateLogin = loginUseCaseProviders;
  delegateInscripcion = inscripcionUseCaseProviders;
  sweet = new SweetAlert();
  private onDestroy$: Subject<void> = new Subject<void>();
  rol!: number;
  usuarioLogeado: boolean = false;

  selected!: CursoDomainEntity;

  showModal = false;
  suscription!: Subscription;

  openModal(i: number) {
    this.selected = this.courses[i];
    console.log(this.selected);
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  constructor(
    private cursoService: CursoService,
    private usuarioService: UsuarioService,
    private inscripcionService: InscripcionService,
    private router: Router
  ) {}
  ngAfterViewInit(): void {
    window.scrollTo(0, 0); // Renderizar hacia arriba de la pantalla
  }

  

  ngOnInit() {
    this.actualizarCarrito()


    this.getAllCourseAdmin();
    this.delegateLogin.hasRolUseCaseProvider
      .useFactory(this.usuarioService)
      .execute();
    this.delegateLogin.hasRolUseCaseProvider
      .useFactory(this.usuarioService)
      .statusRolEmmit.subscribe({
        next: (value: number) => {
          this.rol = value;
          if (value == -1) {
            this.usuarioLogeado = false;
          } else {
            this.usuarioLogeado = false;
          }
        },
      });
      
  }
  user ="";
  curso(titulo: string) {
    
    this.delegateLogin
    .hasTokenUserUseCaseUseProvider.useFactory()
    .statusTokenEmmit.subscribe({
      next: (value: IUsuarioTokenDomain) => {
        this.user = value.usuario?.email!;
      },
    });


    this.actualizoInscripcion(this.user,titulo);
    this.router.navigate([`/curso/get/${titulo}`]);
  }

  getAllCourseAdmin() {
    this.delegateCurso.GetAllCursoUseCaseProvider.useFactory(
      this.cursoService
    ).execute();

    this.delegateCurso.GetAllCursoUseCaseProvider.useFactory(this.cursoService)
      .statusEmmit.pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (value: CursoDomainEntity[]) => {
          this.courses = value;
        },
        error: () => {
          this.sweet.toFire('Curso', 'Error al Obtener Curso', 'error');
        },
      });
  }
  

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  crearCurso() {
    this.router.navigate(['curso/create']);
  }
  refresh() {
    this.delegateCurso.GetAllCursoUseCaseProvider.useFactory(
      this.cursoService
    ).execute();
  }

  actualizarCarrito() {
    this.delegateCurso.AgregarCursoCarritoUseCaseProvider.useFactory(
      this.inscripcionService
    ).execute();
  }
  // Variable para controlar el estado de expansión de la descripción
expandedDescriptions: boolean[] = [];

// Función para obtener la descripción truncada o expandida según el estado
getDescription(description: string, index: number): string {
  if (this.expandedDescriptions[index]) {
    return description;
  } else {
    // Trunca la descripción a una longitud deseada
    const maxLength = 100;
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + '...';
    } else {
      return description;
    }
  }
}

// Función para verificar si la descripción está truncada
isTextOverflow(description: string, index: number): boolean {
  const maxLength = 100;
  return description.length > maxLength && !this.expandedDescriptions[index];
}

// Función para expandir o contraer la descripción al hacer clic en "Ver más"
expandDescription(index: number): void {
  this.expandedDescriptions[index] = !this.expandedDescriptions[index];
}

actualizoInscripcion(email: string, titulo: string){
 const data : IUsuarioCursoInscripcionDomain = {
  email: email,
  titulo: titulo
 }
  this.delegateInscripcion.getInscripcionUsuarioCursoUseCaseProvider
      .useFactory(this.inscripcionService)
      .execute(data);
}
}
