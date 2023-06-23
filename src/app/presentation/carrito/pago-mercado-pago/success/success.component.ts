import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InscripcionService } from 'src/app/domain/services/inscripcion.service.domain';
import { inscripcionUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-inscripcion/delegate-inscripcion.infrastructure';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent implements OnInit {
  delegateInscripcion = inscripcionUseCaseProviders;
  constructor(
    private router: Router,
    private inscripcionService: InscripcionService
  ) {}
  ngOnInit(): void {
    this.delegateInscripcion.DeleteInscripcionUseCaseProvider.useFactory(
      this.inscripcionService
    )
      .execute(localStorage.getItem('idInscripcion')!)
      .subscribe({
        next: (value: boolean) => {
          console.log(value);
          localStorage.removeItem('idInscripcion');
          this.router.navigate(['/carrito']);
        },
      });
  }
}
