import { Observable } from 'rxjs';
import { InscripcionDomainEntity } from 'src/app/domain/entities/inscripcion.entity.domain';
import { InscripcionService } from 'src/app/domain/services/inscripcion.service.domain';
import { CrearInscripcionDto } from 'src/app/infrastructure/dto/create/create-inscripcion.dto';

export class CreateInscripcionUseCase {
  constructor(private inscripcionService: InscripcionService) {}

  execute(param: CrearInscripcionDto): Observable<InscripcionDomainEntity> {
    return this.inscripcionService.create(param);
  }
}
