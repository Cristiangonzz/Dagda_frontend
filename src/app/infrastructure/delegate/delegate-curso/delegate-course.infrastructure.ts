import { AgregarCursoCarritoUseCase } from "src/app/application/use-case/carrito/agregar-curso-carrito.usecase.appliaction";
import { CreateCursoUseCase } from "src/app/application/use-case/curso/create-curso.use-case";
import { DeleteCursoUseCase } from "src/app/application/use-case/curso/delete-curso.use-case";
import { GetAllCursoUseCase } from "src/app/application/use-case/curso/find-all-course.use-case";
import { GetCourseUseCase } from "src/app/application/use-case/curso/get-by-id-curso.use-case";
import { GetCursoByNameUseCase } from "src/app/application/use-case/curso/get-by-titulo-curso.use-case";
import { GetImagenCursoUseCase } from "src/app/application/use-case/curso/get-imagen-curso.use-case";
import { GuardarImagenCursoUseCase } from "src/app/application/use-case/curso/guardar-imagen-curso.use-case";
import { UpdateCursoUseCase } from "src/app/application/use-case/curso/update-curso.use-case";
import { CursoService } from "src/app/domain/services/curso.service.domain";
import { InscripcionService } from "src/app/domain/services/inscripcion.service.domain";

const CreateCursoUseCaseFactory = (() => {
  let instance: CreateCursoUseCase;

  const factory = (service: CursoService): CreateCursoUseCase => {
    if (!instance) {
      instance = new CreateCursoUseCase(service);
    }

    return instance;
  };

  return factory;
})();


const AgregarCursoCarritoUseCaseFactory = (() => {
  let instance: AgregarCursoCarritoUseCase;

  const factory = (service: InscripcionService): AgregarCursoCarritoUseCase => {
    if (!instance) {
      instance = new AgregarCursoCarritoUseCase(service);
    }

    return instance;
  };

  return factory;
})();
const GuardarImagenCursoUseCaseFactory = (() => {
  let instance: GuardarImagenCursoUseCase;

  const factory = (service : CursoService): GuardarImagenCursoUseCase => {
    if (!instance) {
      instance = new GuardarImagenCursoUseCase(service);
    }

    return instance;
  };

  return factory;
})();
const GetImagenCursoUseCaseFactory = (() => {
  let instance: GetImagenCursoUseCase;

  const factory = (service : CursoService): GetImagenCursoUseCase => {
    if (!instance) {
      instance = new GetImagenCursoUseCase(service);
    }

    return instance;
  };

  return factory;
})();


const UpdateCursoUseCaseFactory = (() => {
  let instance: UpdateCursoUseCase;

  const factory = (service: CursoService): UpdateCursoUseCase => {
    if (!instance) {
      instance = new UpdateCursoUseCase(service);
    }

    return instance;
  };

  return factory;
})();

const DeleteCursoUseCaseFactory = (() => {
  let instance: DeleteCursoUseCase;

  const factory = (service: CursoService): DeleteCursoUseCase => {
    if (!instance) {
      instance = new DeleteCursoUseCase(service);
    }

    return instance;
  };

  return factory;
})();

const GetCourseUseCaseFactory = (() => {
  let instance: GetCourseUseCase;

  const factory = (service: CursoService): GetCourseUseCase => {
    if (!instance) {
      instance = new GetCourseUseCase(service);
    }

    return instance;
  };

  return factory;
})();

const GetCursoByNameUseCaseFactory = (() => {
  let instance: GetCursoByNameUseCase;

  const factory = (service: CursoService): GetCursoByNameUseCase => {
    if (!instance) {
      instance = new GetCursoByNameUseCase(service);
    }

    return instance;
  };

  return factory;
})();

const GetAllCursoUseCaseFactory = (() => {
  let instance: GetAllCursoUseCase;

  const factory = (service: CursoService): GetAllCursoUseCase => {
    if (!instance) {
      instance = new GetAllCursoUseCase(service);
    }

    return instance;
  };

  return factory;
})();


export const cursoUseCaseProviders = {
  CreateCursoUseCaseProvider: {
    provide: CreateCursoUseCase,
    useFactory: CreateCursoUseCaseFactory,
    deps: [CursoService],
  },
  UpdateCursoUseCaseProvider: {
    provide: UpdateCursoUseCase,
    useFactory: UpdateCursoUseCaseFactory,
    deps: [CursoService],
  },
  deleteCursoUseCaseProvider: {
    provide: DeleteCursoUseCase,
    useFactory: DeleteCursoUseCaseFactory,
    deps: [CursoService],
  },
  getCourseUseCaseProvider: {
    provide: GetCourseUseCase,
    useFactory: GetCourseUseCaseFactory,
    deps: [CursoService],
  },
  GetAllCursoUseCaseProvider: {
    provide: GetAllCursoUseCase,
    useFactory: GetAllCursoUseCaseFactory,
    deps: [CursoService],
  },

  GetCursoByNameUseCaseProvider: {
    provide: GetCursoByNameUseCase,
    useFactory: GetCursoByNameUseCaseFactory,
    deps: [CursoService],
  },
  //funcion de carrito
  AgregarCursoCarritoUseCaseProvider: {
    provide: AgregarCursoCarritoUseCase,
    useFactory: AgregarCursoCarritoUseCaseFactory,
    deps: [InscripcionService],
  },
//Funciones de imagenes
  GuardarImagenCursoUseProvider: {
    provide: GuardarImagenCursoUseCase,
    useFactory: GuardarImagenCursoUseCaseFactory,
    deps: [CursoService],
  },
  GetImagenCursoUseProvider: {
    provide: GetImagenCursoUseCase,
    useFactory: GetImagenCursoUseCaseFactory,
    deps: [CursoService],
  },

};
