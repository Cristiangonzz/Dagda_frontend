import { AfterViewInit, Component, OnInit } from '@angular/core';
import { InscripcionService } from 'src/app/domain/services/inscripcion.service.domain';
import { cursoUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-curso/delegate-course.infrastructure';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit, OnInit {
  delegateCurso = cursoUseCaseProviders;
  constructor(private inscripcionService: InscripcionService) {}
  ngOnInit(): void {
    this.delegateCurso.AgregarCursoCarritoUseCaseProvider.useFactory(
      this.inscripcionService
    ).execute();
    // this.agregarAcordes(this.cancion);  
  }

  ngAfterViewInit(): void {
    window.scrollTo(0, 0); // Renderizar hacia arriba de la pantalla
  }

  // cancion: string =
  //   'Te damos honra, te damos gloria Rey de reyes Quiero levantar a ti mis manos Maravilloso Jesus Milagroso señor ';
  // cancionConAcorde: string = '';
  // cancionConPosiciones!: string [];
  // agregarAcordes(letra: string) {
  //   this.cancionConPosiciones = letra.split(' ');
    
  //   for (let i = 0; i < this.cancionConPosiciones.length; i++) {
  //     console.log(`Palabra en la posición ${i}: ${this.cancionConPosiciones[i]}`);
  //   }
  // }
  // acorde: string[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  // eligirAcorde :boolean = false;
  // posicionCancion: number = 0;
  // seleccionarAcorde(posicion: number) {
  //   this.eligirAcorde = !this.eligirAcorde
  //   this.posicionCancion = posicion;


  // }
}
