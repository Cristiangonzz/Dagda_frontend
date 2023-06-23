import { HasTokenUserUseCase } from 'src/app/application/use-case/login/get-usuario-token.use.case';
import { HasRolUseCase } from 'src/app/application/use-case/login/has-rol-user.use-case.application';
import { HasUserUseCase } from 'src/app/application/use-case/login/has-user.use-case';
import { UsuarioService } from 'src/app/domain/services/usuario.service.domain';

const HasTokenUserUseCaseUseCaseFactory = (() => {
  let instance: HasTokenUserUseCase;

  const factory = (): HasTokenUserUseCase => {
    if (!instance) {
      instance = new HasTokenUserUseCase();
    }

    return instance;
  };

  return factory;
})();

const HasUserLocalStrotageUseCaseFactory = (() => {
  let instance: HasUserUseCase;

  const factory = (): HasUserUseCase => {
    if (!instance) {
      instance = new HasUserUseCase();
    }

    return instance;
  };

  return factory;
})();
const HasRolLocalStrotageUseCaseFactory = (() => {
  let instance: HasRolUseCase;

  const factory = (service: UsuarioService): HasRolUseCase => {
    if (!instance) {
      instance = new HasRolUseCase(service);
    }

    return instance;
  };

  return factory;
})();


export const loginUseCaseProviders = {
  hasTokenUserUseCaseUseProvider: {
    provide: HasTokenUserUseCase,
    useFactory: HasTokenUserUseCaseUseCaseFactory,
    deps: [],
  },
  hasUserUseCaseProvider: {
    provide: HasUserUseCase,
    useFactory: HasUserLocalStrotageUseCaseFactory,
    deps: [],
  },
  hasRolUseCaseProvider: {
    provide: HasRolUseCase,
    useFactory: HasRolLocalStrotageUseCaseFactory,
    deps: [UsuarioService],
  },
 
};
