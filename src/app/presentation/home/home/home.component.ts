import { AfterViewInit, Component, OnInit } from '@angular/core';
import { InscripcionService } from 'src/app/domain/services/inscripcion.service.domain';
import { cursoUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-curso/delegate-course.infrastructure';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit ,OnInit{
  delegateCurso = cursoUseCaseProviders;
  constructor(private inscripcionService: InscripcionService,) { }
  ngOnInit(): void {
    this.delegateCurso.AgregarCursoCarritoUseCaseProvider
    .useFactory(this.inscripcionService).execute();
  }

  ngAfterViewInit(): void {
    window.scrollTo(0, 0); // Renderizar hacia arriba de la pantalla
  }


  
  
}
