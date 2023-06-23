import { BehaviorSubject, Observable, asyncScheduler } from 'rxjs';
import { Injectable } from '@angular/core';
import { InscripcionService } from 'src/app/domain/services/inscripcion.service.domain';
import { InscripcionDomainEntity } from 'src/app/domain/entities/inscripcion.entity.domain';
import { IUsuarioCursoInscripcionDomain } from 'src/app/domain/interfaces/find-usuario-curso-inscripcion.inteface.domain';

@Injectable({
  providedIn: 'root',
})
export class GetInscripcionUsuarioCursoUseCase {
  private inscripto: boolean = false;
  private inscripcionData= " ";
//Un booleano para saber si esta inscripcto o no 
  public inscriptoEmmit: BehaviorSubject<boolean> = new BehaviorSubject<
  boolean
  >(this.inscripto);

  //Un observable para saber los datos de la inscripcion
  public emmitInscripcionDatos: BehaviorSubject<string>
   = new BehaviorSubject<string>(this.inscripcionData);
  constructor(private inscripcionService: InscripcionService) {}

  execute (data: IUsuarioCursoInscripcionDomain){
    this.inscripto = false;
    if (this.inscriptoEmmit.observed && !this.inscriptoEmmit.closed) {
      this.inscripcionService.FindUsuarioCursoInscripcion(data).subscribe({
        next: (value: InscripcionDomainEntity[]) => {
          this.inscripcionData = value[0].incripcionId;
         
          if (value.length > 0) {
            this.inscripto = true;
            
          }else{
            this.inscripto = false;
           
          }
        },
        error: (error: Error) => {
          console.log(error);
        },
        complete: () => {
          this.emmitInscripcionDatos.next(this.inscripcionData);
          this.inscriptoEmmit.next(this.inscripto);
          console.log('complete');
        }

      });
    }
  };
}
