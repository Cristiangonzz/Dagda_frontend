import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loginUseCaseProviders } from 'src/app/infrastructure/delegate/delegete-login/delegate-login.infrastructure';
import { CursoService } from 'src/app/domain/services/curso.service.domain';
import { UsuarioReferenciaDomainEntity } from 'src/app/domain/entities/usuario-referencia.entity.domain';
import { usuarioReferenciaUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-usuario-referencia/delegate-usuario-referencia.infrastructure';
import { UsuarioReferenciaService } from 'src/app/domain/services/usuario-referente.service.domain';
import { IUsuarioTokenDomain } from 'src/app/domain/interfaces/usuario.token.interface.domain';
import { SweetAlert } from '../../shared/sweetAlert/sweet-alert.presentation';
import { UsuarioDomainEntity } from 'src/app/domain/entities/usuario.entity.domain';

@Component({
  selector: 'app-usuario-referencia',
  templateUrl: './usuario-referencia.component.html',
  styleUrls: ['./usuario-referencia.component.css'],
})
export class UsuarioReferenciaComponent implements OnInit, AfterViewInit {
  usuarioReferencia!: UsuarioReferenciaDomainEntity[];
  delegateUsuarioReferencia = usuarioReferenciaUseCaseProviders;
  delegateLogin = loginUseCaseProviders;
  usuarioActual!: UsuarioDomainEntity;
  sweet = new SweetAlert();
  copiado: boolean = false;
 




  
  constructor(
    private cursoService: CursoService,
    private usuarioReferenciaService: UsuarioReferenciaService,
    private router: Router,
  ) {}

  ngAfterViewInit(): void {
    window.scrollTo(0, 0); // Renderizar hacia arriba de la pantalla  
  }
 


  ngOnInit() {
    this.getUsuario();
    this.getAllReferencias();
    
  }

  getUsuario(){
    this.delegateLogin.hasTokenUserUseCaseUseProvider.useFactory()
    .execute();
    this.delegateLogin.hasTokenUserUseCaseUseProvider.useFactory()
    .statusTokenEmmit.subscribe({
      next: (value: IUsuarioTokenDomain) => {
        this.usuarioActual = value.usuario as UsuarioDomainEntity;
      },
    });
  }
  getAllReferencias() {
    this.delegateUsuarioReferencia.getAllUsuarioReferenciaUseCaseProvider.useFactory(
      this.usuarioReferenciaService
    ).execute( this.usuarioActual.email).subscribe({
        next: (value: UsuarioReferenciaDomainEntity[]) => {
          this.usuarioReferencia = value;
        },
        error: () => {
          this.sweet.toFire('Referencias', 'Error al Obtener las Referencias', 'error');
        },
      });
  }
  
  crearCurso() {
    this.router.navigate(['curso/create']);
  }
  copyText(text: string) {
    navigator.clipboard.writeText(text)
      .then(() => {
        this.copiado = true; // Cambiar el estado del botón a "Copiado"

      setTimeout(() => {
        this.copiado = false; // Restablecer el estado del botón a "Copiar"
      }, 3000); // 3000 milisegundos = 3 segundos

      })
      .catch((error) => {
        console.error('Error al copiar el texto: ' + error);
      });
  }

 
  
}
