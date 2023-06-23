import { NodeMailerUseCase } from "src/app/application/use-case/nodemailer/nodemailer.use.case";
import { MembresiaService } from "src/app/domain/services/membresia.service.domain";
import { NodeMailerService } from "src/app/domain/services/nodemailer.service.domain";


const NodeMailerUseCaseFactory = (() => {
  let instance: NodeMailerUseCase;

  const factory = (service: NodeMailerService): NodeMailerUseCase => {
    if (!instance) {
      instance = new NodeMailerUseCase(service);
    }

    return instance;
  };

  return factory;
})();


export const nodeMailerUseCaseProviders = {
  nodeMailerUseCaseProvider: {
    provide: NodeMailerUseCase,
    useFactory: NodeMailerUseCaseFactory,
    deps: [NodeMailerService],
  },
};