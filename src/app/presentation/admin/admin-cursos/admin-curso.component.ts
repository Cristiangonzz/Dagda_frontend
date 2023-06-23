import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { SweetAlert } from '../../shared/sweetAlert/sweet-alert.presentation';
import { loginUseCaseProviders } from 'src/app/infrastructure/delegate/delegete-login/delegate-login.infrastructure';
import { CursoDomainEntity } from 'src/app/domain/entities/curso.entity.domain';
import { cursoUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-curso/delegate-course.infrastructure';
import { CursoService } from 'src/app/domain/services/curso.service.domain';
import { UsuarioService } from 'src/app/domain/services/usuario.service.domain';

@Component({
  selector: 'app-admin-curso',
  templateUrl: './admin-curso.component.html',
  styleUrls: ['./admin-curso.component.css'],
})
export class AdminCursoComponent implements OnInit, OnDestroy, AfterViewInit {
  courses!: CursoDomainEntity[];
  delegateCurso = cursoUseCaseProviders;
  sweet = new SweetAlert();
  private onDestroy$: Subject<void> = new Subject<void>();
 

  suscription!: Subscription;


  
  constructor(
    private cursoService: CursoService,
    private router: Router,
  ) {}

  ngAfterViewInit(): void {
    window.scrollTo(0, 0); // Renderizar hacia arriba de la pantalla  
  }
 


  ngOnInit() {
    this.getAllCourseAdmin();
    
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
  deleteCourse(_id: string) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'No podras revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#e64141',
    }).then((result) => {
      if (result.isConfirmed) {
        this.delegateCurso.deleteCursoUseCaseProvider
          .useFactory(this.cursoService)
          .execute(_id)
          .subscribe({
            next: () => {
              this.sweet.toFire(
                'Curso',
                'Curso Eliminado Correctamente',
                'success'
              );
              this.refresh();
            },
            error: (error) => {
              this.sweet.toFire('Curso', error.message, 'error');
            },
            complete: () => {
              this.sweet.toFire(
                'Curso',
                'Curso Eliminado Correctamente',
                'success'
              );
              this.refresh();
            },
          });
      }
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

//funciones para editar curso
modalTitulo!: boolean;
datoModalTitulo!: string;
editarCursoTitulo(titulo: string) {
  this.modalTitulo = !this.modalTitulo;
  this.datoModalTitulo = titulo;
}

editarCurso(titulo : string){

  this.router.navigate([`curso/update/${titulo}`]);
}









}
