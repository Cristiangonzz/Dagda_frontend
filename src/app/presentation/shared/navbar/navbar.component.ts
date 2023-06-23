import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CursoDomainEntity } from 'src/app/domain/entities/curso.entity.domain';
import { IUsuarioTokenDomain } from 'src/app/domain/interfaces/usuario.token.interface.domain';
import { InscripcionService } from 'src/app/domain/services/inscripcion.service.domain';
import { UsuarioService } from 'src/app/domain/services/usuario.service.domain';
import { cursoUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-curso/delegate-course.infrastructure';
import { usuarioUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-usuario/delegate-usuario.infrastructure';
import { loginUseCaseProviders } from 'src/app/infrastructure/delegate/delegete-login/delegate-login.infrastructure';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  delegateLogin = loginUseCaseProviders;
  delegateUsuario = usuarioUseCaseProviders;
  delegateCurso = cursoUseCaseProviders;
  isAdmin?: boolean = false;
  photo!: string;
  name: string = '';
  rol!: number;
  cursosCarrito: CursoDomainEntity[] = [];

  usuarioLogeado: boolean = false;
  constructor(
    private router: Router, 
    private usuarioService: UsuarioService,
    private inscripcionService: InscripcionService,
    ) {}

  ngOnInit(): void {
    
    this.logeado();
    this.actualizarRol();
    this.actualizarUsuario();
    this.cantidadCursoCarrito();
  }

  actualizarRol() {
    this.delegateLogin.hasRolUseCaseProvider
      .useFactory(this.usuarioService)
      .execute();
    this.delegateLogin.hasRolUseCaseProvider
      .useFactory(this.usuarioService)
      .statusRolEmmit.subscribe((status: number) => {
        this.rol = status;
        if (status === 1) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      });
  }
  actualizarUsuario() {
    this.delegateLogin.hasTokenUserUseCaseUseProvider.useFactory().execute();
    this.delegateLogin.hasTokenUserUseCaseUseProvider
      .useFactory()
      .statusTokenEmmit.subscribe((data: IUsuarioTokenDomain) => {
        this.photo = data.usuario?.foto || '';
        this.name = data.usuario?.primer_nombre || 'Usuario';
      });
  }
  logeado() {
    this.delegateLogin.hasUserUseCaseProvider.useFactory().execute();
    this.delegateLogin.hasUserUseCaseProvider
      .useFactory()
      .statusEmmit.subscribe((status: boolean) => {
        this.usuarioLogeado = status;
      });
  }
  out() {
    localStorage.clear();
    this.actualizarRol();
    this.delegateLogin.hasUserUseCaseProvider.useFactory().execute();
    this.router.navigate(['/home']);
  }

  inicio() {
    this.router.navigate(['/home']);
  }
  registrarse() {
    this.router.navigate(['usuario/registrar']);
  }
  course() {
    this.router.navigate(['curso/get-all']);
  }
  login() {
    this.router.navigate([`login`]);
  }
  membresia() {
    this.router.navigate(['membresia/get-all']);
  }
  cantidadCursoCarrito() {
    this.delegateCurso.AgregarCursoCarritoUseCaseProvider
    .useFactory(this.inscripcionService)
    .cursosCarritoEmmit.subscribe((data: CursoDomainEntity[]) => {
      this.cursosCarrito = data;
    }
    );
  }
  carrito(){
    this.router.navigate(['/carrito']);
  }
}
