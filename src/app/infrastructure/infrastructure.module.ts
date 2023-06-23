import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cursoUseCaseProviders } from './delegate/delegate-curso/delegate-course.infrastructure';
import { CursoService } from '../domain/services/curso.service.domain';
import { CursoImplementationService } from './services/service-cursos/curso.service.infrastructure';
import { HttpClientModule } from '@angular/common/http';
import { categoriaUseCaseProviders } from './delegate/delegate-categoria/delegate-categoria.infrastructure';
import { CategoriaService } from '../domain/services/categoria.service.domain';
import { CategoriaImplementationService } from './services/service-categoria/categoria.service.infrastructure';
import { InscripcionService } from '../domain/services/inscripcion.service.domain';
import { inscripcionUseCaseProviders } from './delegate/delegate-inscripcion/delegate-inscripcion.infrastructure';
import { loginUseCaseProviders } from './delegate/delegete-login/delegate-login.infrastructure';
import { membresiaUseCaseProviders } from './delegate/delegate-membresia/delegate-membresia.infrastructure';
import { MembresiaService } from '../domain/services/membresia.service.domain';
import { MembresiaImplementationService } from './services/service-membresia/membresia.service.infrastructure';
import { usuarioUseCaseProviders } from './delegate/delegate-usuario/delegate-usuario.infrastructure';
import { UsuarioService } from '../domain/services/usuario.service.domain';
import { UsuarioImplementationService } from './services/service-usuario/usuario.service.infrastructure';
import { InscripcionImplementationService } from './services/service-incripcion/inscripcion.service.infrastructure';
import { membresiaUsuarioUseCaseProviders } from './delegate/delegate-membresia-usuario/delegate-membresia-usuario.infrastructure';
import { MembresiaUsuarioImplementationService } from './services/service-membresia-usuario/membresia-usuario.service.infrastructure';
import { MembresiaUsuarioService } from '../domain/services/membresia-usuario.service.domain';
import { nodeMailerUseCaseProviders } from './delegate/delegate-nodemailer/nodemailer.delegate.infrastructure';
import { NodeMailerService } from '../domain/services/nodemailer.service.domain';
import { NodeMailerImplementationService } from './services/service-nodemailer/nodemailer.service.infrastructure';
import { mercadoPagoUseCaseProviders } from './delegate/delegate-Pago/delegate-pago.infrastructure';
import { MercadoPagoService } from '../domain/services/mercado-pago.service.domain';
import { MercadoPagoImplementationService } from './services/service-mercado-pago/mercado-pago.service.infrastructure';
import { usuarioReferenciaUseCaseProviders } from './delegate/delegate-usuario-referencia/delegate-usuario-referencia.infrastructure';
import { UsuarioReferenciaImplementationService } from './services/service-usuario-referencia/usuario.service-referencia.infrastructure';
import { UsuarioReferenciaService } from '../domain/services/usuario-referente.service.domain';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    ...Object.values(cursoUseCaseProviders),
    ...Object.values(categoriaUseCaseProviders),
    ...Object.values(inscripcionUseCaseProviders),
    ...Object.values(loginUseCaseProviders),
    ...Object.values(membresiaUseCaseProviders),
    ...Object.values(membresiaUsuarioUseCaseProviders),
    ...Object.values(usuarioUseCaseProviders),
    ...Object.values(usuarioReferenciaUseCaseProviders),
    ...Object.values(nodeMailerUseCaseProviders),
    ...Object.values(mercadoPagoUseCaseProviders),

    { provide: CategoriaService, useClass: CategoriaImplementationService },
    { provide: CursoService, useClass: CursoImplementationService },
    { provide: InscripcionService, useClass: InscripcionImplementationService },
    { provide: MembresiaService, useClass: MembresiaImplementationService },
    { provide: MembresiaUsuarioService, useClass: MembresiaUsuarioImplementationService },
    { provide: UsuarioService, useClass: UsuarioImplementationService },
    { provide: UsuarioReferenciaService, useClass: UsuarioReferenciaImplementationService },
    { provide: NodeMailerService, useClass: NodeMailerImplementationService },
    { provide: MercadoPagoService, useClass: MercadoPagoImplementationService },
  ],
})
export class InfrastructureModule {}
