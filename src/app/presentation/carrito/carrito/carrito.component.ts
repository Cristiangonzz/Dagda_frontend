import { AfterViewInit, Component, OnInit } from '@angular/core';
import { cursoUseCaseProviders } from '../../../infrastructure/delegate/delegate-curso/delegate-course.infrastructure';
import { CursoDomainEntity } from 'src/app/domain/entities/curso.entity.domain';
import { mercadoPagoUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-Pago/delegate-pago.infrastructure';
import { MercadoPagoService } from 'src/app/domain/services/mercado-pago.service.domain';
import { CreateOrderMercadoPagoDto } from 'src/app/infrastructure/dto/create/create-order-mercado-pago.dto';
import { Router } from '@angular/router';
import { inscripcionUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-inscripcion/delegate-inscripcion.infrastructure';
import { InscripcionDomainEntity } from 'src/app/domain/entities/inscripcion.entity.domain';
import { IUsuarioCursoInscripcionDomain } from 'src/app/domain/interfaces/find-usuario-curso-inscripcion.inteface.domain';
import { InscripcionService } from 'src/app/domain/services/inscripcion.service.domain';
import { usuarioUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-usuario/delegate-usuario.infrastructure';
import { loginUseCaseProviders } from 'src/app/infrastructure/delegate/delegete-login/delegate-login.infrastructure';
import { IUsuarioTokenDomain } from 'src/app/domain/interfaces/usuario.token.interface.domain';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit,AfterViewInit {
  delegateCurso = cursoUseCaseProviders;
  delegateMercadoPago = mercadoPagoUseCaseProviders;
  delegateInscripcion = inscripcionUseCaseProviders;
  delegateLogin = loginUseCaseProviders;
  cantidadCursosCarrito!: number;
  totalPrecio!: number;
  cursosCarrito: CursoDomainEntity[] = [];
  emailUsuario!: string;
  constructor(
    private readonly mercadoPago: MercadoPagoService,
    private readonly inscripcionService: InscripcionService,
    private router: Router
  ) {}
  ngAfterViewInit(): void {
    window.scroll(0,0)
  }
  ngOnInit(): void {
    this.delegateCurso.AgregarCursoCarritoUseCaseProvider
    .useFactory(this.inscripcionService).execute();
    this.delegateLogin.hasTokenUserUseCaseUseProvider
      .useFactory()
      .statusTokenEmmit.subscribe((data: IUsuarioTokenDomain) => {
        this.emailUsuario = data.usuario?.email!;
      });
    this.agregarCursoCarrito();
  }

  agregarCursoCarrito() {
    this.delegateCurso.AgregarCursoCarritoUseCaseProvider
    .useFactory(this.inscripcionService)
    .cursosCarritoEmmit.subscribe(
      {
        next: (value: CursoDomainEntity[]) => {
          this.cursosCarrito = value;
          this.cantidadCursosCarrito = value.length;
          this.totalCart();
        },
      }
    );
  }

  totalProduct(price: number, cant: number) {}
  updateUnits(text: string, cant: number) {}
  deleteProduct(id: string) {}

  totalCart() {
    this.totalPrecio = this.cursosCarrito.reduce(
      (acc, el) => acc + el.precio!,
      0
    );
  } //total de todos los productos

  pagoTotal() {
    const data: CreateOrderMercadoPagoDto = {
      title: 'Total de cursos',
      unit_price: this.totalPrecio,
      currency_id: 'UYU',
    };
    this.delegateMercadoPago.CreateOrderMercadoPagoUseCaseProvider.useFactory(
      this.mercadoPago
    )
      .execute(data)
      .subscribe({
        next: (value) => {
          console.log(value);
          
          window.location.href = value.body.init_point;
        },
      });
  }
  pagarUnidad(precio?: number, titulo?: string) {
    this.guardarIdInscripcion(titulo!);
    const data: CreateOrderMercadoPagoDto = {
      title: titulo!,
      unit_price: precio!,
      currency_id: 'UYU',
    };
    this.delegateMercadoPago.CreateOrderMercadoPagoUseCaseProvider.useFactory(
      this.mercadoPago
    )
      .execute(data)
      .subscribe({
        next: (value) => {
          window.location.href = value.body.init_point;
        },
      });
  }
  guardarIdInscripcion(titulo: string) {
    const dato: IUsuarioCursoInscripcionDomain = {
      email: this.emailUsuario,
      titulo: titulo,
    };
    this.delegateInscripcion.getInscripcionUsuarioCursoUseCaseProvider
      .useFactory(this.inscripcionService)
      .execute(dato);
    this.delegateInscripcion.getInscripcionUsuarioCursoUseCaseProvider
      .useFactory(this.inscripcionService)
      .emmitInscripcionDatos.subscribe({
        next: (value: string) => {
          localStorage.setItem('idInscripcion', value);
        },
      });
  }
}
