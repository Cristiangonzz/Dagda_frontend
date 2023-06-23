import { CreateUsuarioReferenciaUseCase } from "src/app/application/use-case/usuario-referencia/create-usuario-referencia.use-case.application";
import { DeleteUsuarioReferenciaUseCase } from "src/app/application/use-case/usuario-referencia/delete-usuario-referencia.use-case.application";
import { GetAllUsuarioReferenciaUseCase } from "src/app/application/use-case/usuario-referencia/get-all-usuario-referencia.use-case.application";
import { GetEmailUsuarioReferenciaUseCase } from "src/app/application/use-case/usuario-referencia/get-by-email-usuario-referido.use-case.application";
import { GetIdUsuarioReferenciaUseCase } from "src/app/application/use-case/usuario-referencia/get-by-id-usuario-referencia.use-case.application";
import { UpdateUsuarioReferenciaUseCase } from "src/app/application/use-case/usuario-referencia/update-usuario-referencia.use-case.application";
import { UsuarioReferenciaService } from "src/app/domain/services/usuario-referente.service.domain";

const CreateUsuarioReferenciaUseCaseFactory = (() => {
  let instance: CreateUsuarioReferenciaUseCase;

  const factory = (service: UsuarioReferenciaService): CreateUsuarioReferenciaUseCase => {
    if (!instance) {
      instance = new CreateUsuarioReferenciaUseCase(service);
    }

    return instance;
  };

  return factory;
})();

const UpdateUsuarioReferenciaUseCaseFactory = (() => {
  let instance: UpdateUsuarioReferenciaUseCase;

  const factory = (service: UsuarioReferenciaService): UpdateUsuarioReferenciaUseCase => {
    if (!instance) {
      instance = new UpdateUsuarioReferenciaUseCase(service);
    }

    return instance;
  };

  return factory;
})();

const DeleteUsuarioReferenciaUseCaseFactory = (() => {
  let instance: DeleteUsuarioReferenciaUseCase;

  const factory = (service: UsuarioReferenciaService): DeleteUsuarioReferenciaUseCase => {
    if (!instance) {
      instance = new DeleteUsuarioReferenciaUseCase(service);
    }

    return instance;
  };

  return factory;
})();

const GetEmailUsuarioReferenciaUseCaseFactory = (() => {
  let instance: GetEmailUsuarioReferenciaUseCase;

  const factory = (service: UsuarioReferenciaService): GetEmailUsuarioReferenciaUseCase => {
    if (!instance) {
      instance = new GetEmailUsuarioReferenciaUseCase(service);
    }

    return instance;
  };

  return factory;
})();
const GetIdUsuarioReferenciaUseCaseFactory = (() => {
  let instance: GetIdUsuarioReferenciaUseCase;

  const factory = (service: UsuarioReferenciaService): GetIdUsuarioReferenciaUseCase => {
    if (!instance) {
      instance = new GetIdUsuarioReferenciaUseCase(service);
    }

    return instance;
  };

  return factory;
})();

const GetAllUsuarioReferenciaUseCaseFactory = (() => {
  let instance: GetAllUsuarioReferenciaUseCase;

  const factory = (service: UsuarioReferenciaService): GetAllUsuarioReferenciaUseCase => {
    if (!instance) {
      instance = new GetAllUsuarioReferenciaUseCase(service);
    }

    return instance;
  };

  return factory;
})();



export const usuarioReferenciaUseCaseProviders = {
  createUsuarioReferenciaUseCaseProvider: {
    provide: CreateUsuarioReferenciaUseCase,
    useFactory: CreateUsuarioReferenciaUseCaseFactory,
    deps: [UsuarioReferenciaService],
  },
  updateUsuarioReferenciaUseCaseProvider: {
    provide: UpdateUsuarioReferenciaUseCase,
    useFactory: UpdateUsuarioReferenciaUseCaseFactory,
    deps: [UsuarioReferenciaService],
  },
  deleteUsuarioReferenciaUseCaseProvider: {
    provide: DeleteUsuarioReferenciaUseCase,
    useFactory: DeleteUsuarioReferenciaUseCaseFactory,
    deps: [UsuarioReferenciaService],
  },
  
  getAllUsuarioReferenciaUseCaseProvider: {
    provide: GetAllUsuarioReferenciaUseCase,
    useFactory: GetAllUsuarioReferenciaUseCaseFactory,
    deps: [UsuarioReferenciaService],
  },

  getEmailUsuarioReferenciaUseCaseProvider: {
    provide: GetEmailUsuarioReferenciaUseCase,
    useFactory: GetEmailUsuarioReferenciaUseCaseFactory,
    deps: [UsuarioReferenciaService],
  },
  getIdUsuarioReferenciaUseCaseProvider: {
    provide: GetIdUsuarioReferenciaUseCase,
    useFactory: GetIdUsuarioReferenciaUseCaseFactory,
    deps: [UsuarioReferenciaService],
  },
 
};
