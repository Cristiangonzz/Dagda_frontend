import { BehaviorSubject, Observable, asyncScheduler } from 'rxjs';
import { Injectable } from '@angular/core';
import { InscripcionService } from 'src/app/domain/services/inscripcion.service.domain';
import { InscripcionDomainEntity } from 'src/app/domain/entities/inscripcion.entity.domain';
import { IUsuarioCursoInscripcionDomain } from 'src/app/domain/interfaces/find-usuario-curso-inscripcion.inteface.domain';
import { MembresiaUsuarioService } from 'src/app/domain/services/membresia-usuario.service.domain';
import { GetMembresiaUsuarioIncripcionDTO } from 'src/app/infrastructure/dto/get/get-usuario-membresia-email-nombre.dto';
import { MembresiaUsuarioDomainEntity } from 'src/app/domain/entities/membresia-usuario.entity.domain';

@Injectable({
  providedIn: 'root',
})
export class GetMembresiaUsuarioIncripcionUseCase {
  private inscripto: boolean = false;
  private inscripcionData= " ";
//Un booleano para saber si esta inscripcto o no 
  public inscriptoEmmit: BehaviorSubject<boolean> = new BehaviorSubject<
  boolean
  >(this.inscripto);

  //Un observable para saber los datos de la inscripcion
  public emmitInscripcionDatos: BehaviorSubject<string>
   = new BehaviorSubject<string>(this.inscripcionData);
  constructor(private membresiaUsuarioService: MembresiaUsuarioService) {}

  execute (data: GetMembresiaUsuarioIncripcionDTO):Observable<MembresiaUsuarioDomainEntity[]>{
   
      return this.membresiaUsuarioService.FindUsuarioMembresiaInscripcion(data);
     
    
  };
}
