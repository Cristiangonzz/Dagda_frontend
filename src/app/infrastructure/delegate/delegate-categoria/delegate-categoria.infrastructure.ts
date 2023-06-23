import { CreateCategoriaUseCase } from "src/app/application/use-case/categoria/create-categoria.use-case";
import { DeleteCategoriaUseCase } from "src/app/application/use-case/categoria/delete-categoria.use-case";
import { GetAllCategoriaUseCase } from "src/app/application/use-case/categoria/find-all-categoria.use-case";
import { GetNameCategoriaUseCase } from "src/app/application/use-case/categoria/get-categoria-ByName.use-case";
import { GetCategoriaUseCase } from "src/app/application/use-case/categoria/get-categoria.use-case";
import { UpdateCategoriaUseCase } from "src/app/application/use-case/categoria/update-categoria.use-case";
import { CategoriaService } from "src/app/domain/services/categoria.service.domain";


const CreateCategoriaUseCaseFactory = (() => {
  let instance: CreateCategoriaUseCase;

  const factory = (service: CategoriaService): CreateCategoriaUseCase => {
    if (!instance) {
      instance = new CreateCategoriaUseCase(service);
    }

    return instance;
  };

  return factory;
})();

const UpdateCategoriaUseCaseFactory = (() => {
  let instance: UpdateCategoriaUseCase;

  const factory = (service: CategoriaService): UpdateCategoriaUseCase => {
    if (!instance) {
      instance = new UpdateCategoriaUseCase(service);
    }

    return instance;
  };

  return factory;
})();
const DeleteCategoriaUseCaseFactory = (() => {
  let instance: DeleteCategoriaUseCase;

  const factory = (service: CategoriaService): DeleteCategoriaUseCase => {
    if (!instance) {
      instance = new DeleteCategoriaUseCase(service);
    }

    return instance;
  };

  return factory;
})();

const GetNameCategoriaUseCaseFactory = (() => {
  let instance: GetNameCategoriaUseCase;

  const factory = (service: CategoriaService): GetNameCategoriaUseCase => {
    if (!instance) {
      instance = new GetNameCategoriaUseCase(service);
    }

    return instance;
  };

  return factory;
})();

const GetCategoriaUseCaseFactory = (() => {
  let instance: GetCategoriaUseCase;

  const factory = (service: CategoriaService): GetCategoriaUseCase => {
    if (!instance) {
      instance = new GetCategoriaUseCase(service);
    }

    return instance;
  };

  return factory;
})();

const GetAllCategoriaUseCaseFactory = (() => {
  let instance: GetAllCategoriaUseCase;

  const factory = (service: CategoriaService): GetAllCategoriaUseCase => {
    if (!instance) {
      instance = new GetAllCategoriaUseCase(service);
    }

    return instance;
  };

  return factory;
})();


export const categoriaUseCaseProviders = {
  createCategoriaUseCaseProvider: {
    provide: CreateCategoriaUseCase,
    useFactory: CreateCategoriaUseCaseFactory,
    deps: [CategoriaService],
  },
  updateCategoriaUseCaseProvider: {
    provide: UpdateCategoriaUseCase,
    useFactory: UpdateCategoriaUseCaseFactory,
    deps: [CategoriaService],
  },

  deleteCategoriaUseCaseProvider: {
    provide: DeleteCategoriaUseCase,
    useFactory: DeleteCategoriaUseCaseFactory,
    deps: [CategoriaService],
  },

  getNameCategoriaUseCaseProvider: {
    provide: GetNameCategoriaUseCase,
    useFactory: GetNameCategoriaUseCaseFactory,
    deps: [CategoriaService],
  },

  getCategoriaUseCaseProvider: {
    provide: GetCategoriaUseCase,
    useFactory: GetCategoriaUseCaseFactory,
    deps: [CategoriaService],
  },

  getAllCategoriaUseCaseProvider: {
    provide: GetAllCategoriaUseCase,
    useFactory: GetAllCategoriaUseCaseFactory,
    deps: [CategoriaService],
  },

};
