import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CursoService } from 'src/app/domain/services/curso.service.domain';
import { cursoUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-curso/delegate-course.infrastructure';
import { SweetAlert } from '../../shared/sweetAlert/sweet-alert.presentation';

@Component({
  selector: 'app-delete-curso',
  templateUrl: './delete-curso.component.html',
  styleUrls: ['./delete-curso.component.css'],
})
export class DeleteCursoComponent {
  delegateCurso = cursoUseCaseProviders;
  sweet = new SweetAlert();

  

  constructor(
    private cursoService: CursoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  deleteCourse() {
    const cursoId = this.activatedRoute.snapshot.params['id'];
    this.delegateCurso.deleteCursoUseCaseProvider.useFactory(this.cursoService).execute(cursoId)
    .subscribe({
      next: () => {
        
        this.router.navigate(['/curso/get-all']);
      },
      error: () => {
        this.sweet.toFire('Error', 'Error al eliminar Curso ', 'error');
      },
      complete: () => {
        
        this.sweet.toFire('Completo', 'Curso Creado', 'success');
      },
    });
  }
}
