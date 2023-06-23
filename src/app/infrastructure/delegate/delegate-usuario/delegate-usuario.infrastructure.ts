import { CreateUsuarioUseCase } from "src/app/application/use-case/usuario/create-usuario.use-case.application";
import { DeleteUsuarioUseCase } from "src/app/application/use-case/usuario/delete-usuario.use-case.application";
import { GetAllUsuarioUseCase } from "src/app/application/use-case/usuario/get-all-usuario.use-case.application";
import { GetEmailUsuarioUseCase } from "src/app/application/use-case/usuario/get-by-email-usuario.use-case.application";
import { GetIdUsuarioUseCase } from "src/app/application/use-case/usuario/get-by-id-usuario.use-case.application";
import { SignInUsuarioUseCase } from "src/app/application/use-case/usuario/sign-in-usuario.usecase";
import { UpdateUsuarioUseCase } from "src/app/application/use-case/usuario/update-admin.use-case.application";
import { UsuarioService } from "src/app/domain/services/usuario.service.domain";

const CreateUsuarioUseCaseFactory = (() => {
  let instance: CreateUsuarioUseCase;

  const factory = (service: UsuarioService): CreateUsuarioUseCase => {
    if (!instance) {
      instance = new CreateUsuarioUseCase(service);
    }

    return instance;
  };

  return factory;
})();

const UpdateUsuarioUseCaseFactory = (() => {
  let instance: UpdateUsuarioUseCase;

  const factory = (service: UsuarioService): UpdateUsuarioUseCase => {
    if (!instance) {
      instance = new UpdateUsuarioUseCase(service);
    }

    return instance;
  };

  return factory;
})();

const DeleteUsuarioUseCaseFactory = (() => {
  let instance: DeleteUsuarioUseCase;

  const factory = (service: UsuarioService): DeleteUsuarioUseCase => {
    if (!instance) {
      instance = new DeleteUsuarioUseCase(service);
    }

    return instance;
  };

  return factory;
})();

const GetEmailUsuarioUseCaseFactory = (() => {
  let instance: GetEmailUsuarioUseCase;

  const factory = (service: UsuarioService): GetEmailUsuarioUseCase => {
    if (!instance) {
      instance = new GetEmailUsuarioUseCase(service);
    }

    return instance;
  };

  return factory;
})();
const GetIdUsuarioUseCaseFactory = (() => {
  let instance: GetIdUsuarioUseCase;

  const factory = (service: UsuarioService): GetIdUsuarioUseCase => {
    if (!instance) {
      instance = new GetIdUsuarioUseCase(service);
    }

    return instance;
  };

  return factory;
})();

const GetAllUsuarioUseCaseFactory = (() => {
  let instance: GetAllUsuarioUseCase;

  const factory = (service: UsuarioService): GetAllUsuarioUseCase => {
    if (!instance) {
      instance = new GetAllUsuarioUseCase(service);
    }

    return instance;
  };

  return factory;
})();

const SignInUsuarioUseCaseFactory = (() => {
  let instance: SignInUsuarioUseCase;

  const factory = (service: UsuarioService): SignInUsuarioUseCase => {
    if (!instance) {
      instance = new SignInUsuarioUseCase(service);
    }

    return instance;
  };

  return factory;
})();


export const usuarioUseCaseProviders = {
  createUsuarioUseCaseProvider: {
    provide: CreateUsuarioUseCase,
    useFactory: CreateUsuarioUseCaseFactory,
    deps: [UsuarioService],
  },
  updateUsuarioUseCaseProvider: {
    provide: UpdateUsuarioUseCase,
    useFactory: UpdateUsuarioUseCaseFactory,
    deps: [UsuarioService],
  },
  deleteUsuarioUseCaseProvider: {
    provide: DeleteUsuarioUseCase,
    useFactory: DeleteUsuarioUseCaseFactory,
    deps: [UsuarioService],
  },
  
  getAllUsuarioUseCaseProvider: {
    provide: GetAllUsuarioUseCase,
    useFactory: GetAllUsuarioUseCaseFactory,
    deps: [UsuarioService],
  },

  getEmailUsuarioUseCaseProvider: {
    provide: GetEmailUsuarioUseCase,
    useFactory: GetEmailUsuarioUseCaseFactory,
    deps: [UsuarioService],
  },
  getIdUsuarioUseCaseProvider: {
    provide: GetIdUsuarioUseCase,
    useFactory: GetIdUsuarioUseCaseFactory,
    deps: [UsuarioService],
  },
  signInUsuarioUseCaseProvider: {
    provide: SignInUsuarioUseCase,
    useFactory: SignInUsuarioUseCaseFactory,
    deps: [UsuarioService],
  },
};
