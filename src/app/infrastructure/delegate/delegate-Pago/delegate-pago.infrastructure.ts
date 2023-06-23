import { CreateOrderMercadoPagoUseCase } from "src/app/application/use-case/carrito/create-order-mercado-pago.use-case";
import { MercadoPagoService } from "src/app/domain/services/mercado-pago.service.domain";

const CreateOrderMercadoPagoUseCaseFactory = (() => {
  let instance: CreateOrderMercadoPagoUseCase;

  const factory = (service: MercadoPagoService): CreateOrderMercadoPagoUseCase => {
    if (!instance) {
      instance = new CreateOrderMercadoPagoUseCase(service);
    }

    return instance;
  };

  return factory;
})();



export const mercadoPagoUseCaseProviders = {
  CreateOrderMercadoPagoUseCaseProvider: {
    provide: CreateOrderMercadoPagoUseCase,
    useFactory: CreateOrderMercadoPagoUseCaseFactory,
    deps: [MercadoPagoService],
  },
 
};
