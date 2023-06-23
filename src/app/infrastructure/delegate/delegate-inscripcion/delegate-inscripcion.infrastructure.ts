import { CreateInscripcionUseCase } from 'src/app/application/use-case/incripcion/create-incripcion.use-case';
import { DeleteInscripcionUseCase } from 'src/app/application/use-case/incripcion/delete-incripcion.use-case';
import { GetAllInscripcionUseCase } from 'src/app/application/use-case/incripcion/get-all-incripcion.use-case copy';
import { GetInscripcionUsuarioCursoUseCase } from 'src/app/application/use-case/incripcion/get-inscripcion-usuario-curso.use-case';
import { InscripcionService } from 'src/app/domain/services/inscripcion.service.domain';

const CreateInscripcionUseCaseFactory = (() => {
  let instance: CreateInscripcionUseCase;

  const factory = (service: InscripcionService): CreateInscripcionUseCase => {
    if (!instance) {
      instance = new CreateInscripcionUseCase(service);
    }

    return instance;
  };

  return factory;
})();

const DeleteInscripcionUseCaseFactory = (() => {
  let instance: DeleteInscripcionUseCase;

  const factory = (service: InscripcionService): DeleteInscripcionUseCase => {
    if (!instance) {
      instance = new DeleteInscripcionUseCase(service);
    }

    return instance;
  };

  return factory;
})();
const GetAllInscripcionUseCaseFactory = (() => {
  let instance: GetAllInscripcionUseCase;

  const factory = (service: InscripcionService): GetAllInscripcionUseCase => {
    if (!instance) {
      instance = new GetAllInscripcionUseCase(service);
    }

    return instance;
  };

  return factory;
})();
const GetInscripcionUsuarioCursoUseCaseFactory = (() => {
  let instance: GetInscripcionUsuarioCursoUseCase;

  const factory = (service: InscripcionService): GetInscripcionUsuarioCursoUseCase => {
    if (!instance) {
      instance = new GetInscripcionUsuarioCursoUseCase(service);
    }

    return instance;
  };

  return factory;
})();

export const inscripcionUseCaseProviders = {
  CreateInscripcionUseCaseProvider: {
    provide: CreateInscripcionUseCase,
    useFactory: CreateInscripcionUseCaseFactory,
    deps: [InscripcionService],
  },

  DeleteInscripcionUseCaseProvider: {
    provide: DeleteInscripcionUseCase,
    useFactory: DeleteInscripcionUseCaseFactory,
    deps: [InscripcionService],
  },
  getAllInscripcionUseCaseProvider: {
    provide: GetAllInscripcionUseCase,
    useFactory: GetAllInscripcionUseCaseFactory,
    deps: [InscripcionService],
  },
  getInscripcionUsuarioCursoUseCaseProvider: {
    provide: GetInscripcionUsuarioCursoUseCase,
    useFactory: GetInscripcionUsuarioCursoUseCaseFactory,
    deps: [InscripcionService],
  },
};
