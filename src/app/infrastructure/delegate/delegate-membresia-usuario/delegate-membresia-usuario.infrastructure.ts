import { GetCourseUseCase } from "src/app/application/use-case/curso/get-by-id-curso.use-case";
import { DeleteMembresiaUsuarioUseCase } from "src/app/application/use-case/membresia-usuario/delete-membresia-usuario.use-case";
import { GetAllMembresiaUsuarioUseCase } from "src/app/application/use-case/membresia-usuario/find-all-membresia-usuario.use-case";
import { GetMembresiaUsuarioUseCase } from "src/app/application/use-case/membresia-usuario/get-by-id-membresia-usuario.use-case";
import { MembresiaUsuarioService } from "src/app/domain/services/membresia-usuario.service.domain";
import { CreateMembresiaUsuarioUseCase } from "src/app/application/use-case/membresia-usuario/create-membresia-usuario.use-case";
import { PertenecerMembresiaUsuarioUseCase } from "src/app/application/use-case/membresia-usuario/Pertenecer-membresia-usuario.use-case";
import { MembresiaService } from "src/app/domain/services/membresia.service.domain";

const CreateMembresiaUsuarioUseCaseFactory = (() => {
  let instance: CreateMembresiaUsuarioUseCase;

  const factory = (service: MembresiaUsuarioService): CreateMembresiaUsuarioUseCase => {
    if (!instance) {
      instance = new CreateMembresiaUsuarioUseCase(service);
    }

    return instance;
  };

  return factory;
})();



const DeleteMembresiaUsuarioUseCaseFactory = (() => {
  let instance: DeleteMembresiaUsuarioUseCase;

  const factory = (service: MembresiaUsuarioService): DeleteMembresiaUsuarioUseCase => {
    if (!instance) {
      instance = new DeleteMembresiaUsuarioUseCase(service);
    }

    return instance;
  };

  return factory;
})();

const GetMembresiaUsuarioUseCaseFactory = (() => {
  let instance: GetMembresiaUsuarioUseCase;

  const factory = (service: MembresiaUsuarioService): GetMembresiaUsuarioUseCase => {
    if (!instance) {
      instance = new GetMembresiaUsuarioUseCase(service);
    }

    return instance;
  };

  return factory;
})();



const GetAllMembresiaUsuarioUseCaseFactory = (() => {
  let instance: GetAllMembresiaUsuarioUseCase;

  const factory = (service: MembresiaUsuarioService): GetAllMembresiaUsuarioUseCase => {
    if (!instance) {
      instance = new GetAllMembresiaUsuarioUseCase(service);
    }

    return instance;
  };

  return factory;
})();

const PertenecerMembresiaUsuarioUseCaseFactory = (() => {
  let instance: PertenecerMembresiaUsuarioUseCase;

  const factory = (service: MembresiaUsuarioService,service2: MembresiaService): PertenecerMembresiaUsuarioUseCase => {
    if (!instance) {
      instance = new PertenecerMembresiaUsuarioUseCase(service,service2);
    }

    return instance;
  };

  return factory;
})();


export const membresiaUsuarioUseCaseProviders = {
  createMembresiaUsuarioUseCaseProvider: {
    provide: CreateMembresiaUsuarioUseCase,
    useFactory: CreateMembresiaUsuarioUseCaseFactory,
    deps: [MembresiaUsuarioService],
  },
 
  deleteMembresiaUsuarioUseCaseProvider: {
    provide: DeleteMembresiaUsuarioUseCase,
    useFactory: DeleteMembresiaUsuarioUseCaseFactory,
    deps: [MembresiaUsuarioService],
  },
  getMembresiaUsuarioUseCaseProvider: {
    provide: GetMembresiaUsuarioUseCase,
    useFactory: GetMembresiaUsuarioUseCaseFactory,
    deps: [MembresiaUsuarioService],
  },
  getAllMembresiaUsuarioUseCaseProvider: {
    provide: GetAllMembresiaUsuarioUseCase,
    useFactory: GetAllMembresiaUsuarioUseCaseFactory,
    deps: [MembresiaUsuarioService],
  },
  pertenecerMembresiaUsuarioUseCaseProvider: {
    provide: PertenecerMembresiaUsuarioUseCase,
    useFactory: PertenecerMembresiaUsuarioUseCaseFactory,
    deps: [MembresiaUsuarioService,MembresiaService],
  },
};
