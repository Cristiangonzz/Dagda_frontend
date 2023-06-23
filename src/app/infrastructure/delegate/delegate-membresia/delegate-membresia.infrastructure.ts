import { GetCourseUseCase } from "src/app/application/use-case/curso/get-by-id-curso.use-case";
import { CreateMembresiaUseCase } from "src/app/application/use-case/membresia/create-membresia.use-case";
import { DeleteMembresiaUseCase } from "src/app/application/use-case/membresia/delete-membresia.use-case";
import { GetAllMembresiaUseCase } from "src/app/application/use-case/membresia/find-all-membresia.use-case";
import { GetMembresiaUseCase } from "src/app/application/use-case/membresia/get-by-id-membresia.use-case";
import { GetMembresiaByNameUseCase } from "src/app/application/use-case/membresia/get-by-nombre-membresia.use-case";
import { UpdateMembresiaUseCase } from "src/app/application/use-case/membresia/update-membresia.use-case";
import { MembresiaService } from "src/app/domain/services/membresia.service.domain";

const CreateMembresiaUseCaseFactory = (() => {
  let instance: CreateMembresiaUseCase;

  const factory = (service: MembresiaService): CreateMembresiaUseCase => {
    if (!instance) {
      instance = new CreateMembresiaUseCase(service);
    }

    return instance;
  };

  return factory;
})();

const UpdateMembresiaUseCaseFactory = (() => {
  let instance: UpdateMembresiaUseCase;

  const factory = (service: MembresiaService): UpdateMembresiaUseCase => {
    if (!instance) {
      instance = new UpdateMembresiaUseCase(service);
    }

    return instance;
  };

  return factory;
})();

const DeleteMembresiaUseCaseFactory = (() => {
  let instance: DeleteMembresiaUseCase;

  const factory = (service: MembresiaService): DeleteMembresiaUseCase => {
    if (!instance) {
      instance = new DeleteMembresiaUseCase(service);
    }

    return instance;
  };

  return factory;
})();

const GetMembresiaUseCaseFactory = (() => {
  let instance: GetMembresiaUseCase;

  const factory = (service: MembresiaService): GetMembresiaUseCase => {
    if (!instance) {
      instance = new GetMembresiaUseCase(service);
    }

    return instance;
  };

  return factory;
})();

const GetMembresiaByNameUseCaseFactory = (() => {
  let instance: GetMembresiaByNameUseCase;

  const factory = (service: MembresiaService): GetMembresiaByNameUseCase => {
    if (!instance) {
      instance = new GetMembresiaByNameUseCase(service);
    }

    return instance;
  };

  return factory;
})();

const GetAllMembresiaUseCaseFactory = (() => {
  let instance: GetAllMembresiaUseCase;

  const factory = (service: MembresiaService): GetAllMembresiaUseCase => {
    if (!instance) {
      instance = new GetAllMembresiaUseCase(service);
    }

    return instance;
  };

  return factory;
})();


export const membresiaUseCaseProviders = {
  createMembresiaUseCaseProvider: {
    provide: CreateMembresiaUseCase,
    useFactory: CreateMembresiaUseCaseFactory,
    deps: [MembresiaService],
  },
  updateMembresiaUseCaseProvider: {
    provide: UpdateMembresiaUseCase,
    useFactory: UpdateMembresiaUseCaseFactory,
    deps: [MembresiaService],
  },
  deleteMembresiaUseCaseProvider: {
    provide: DeleteMembresiaUseCase,
    useFactory: DeleteMembresiaUseCaseFactory,
    deps: [MembresiaService],
  },
  getMembresiaUseCaseProvider: {
    provide: GetMembresiaUseCase,
    useFactory: GetMembresiaUseCaseFactory,
    deps: [MembresiaService],
  },
  getAllMembresiaUseCaseProvider: {
    provide: GetAllMembresiaUseCase,
    useFactory: GetAllMembresiaUseCaseFactory,
    deps: [MembresiaService],
  },

  getMembresiaByNameUseCaseProvider: {
    provide: GetMembresiaByNameUseCase,
    useFactory: GetMembresiaByNameUseCaseFactory,
    deps: [MembresiaService],
  },
};
