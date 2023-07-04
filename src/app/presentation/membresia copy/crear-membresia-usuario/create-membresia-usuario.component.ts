import { Component, OnInit } from '@angular/core';
import { membresiaUsuarioUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-membresia-usuario/delegate-membresia-usuario.infrastructure';
import { loginUseCaseProviders } from 'src/app/infrastructure/delegate/delegete-login/delegate-login.infrastructure';
import { SweetAlert } from '../../shared/sweetAlert/sweet-alert.presentation';
import { CrearMembresiaUsuarioDto } from 'src/app/infrastructure/dto/create/create-membresia-usuario.dto';
import { MembresiaUsuarioService } from 'src/app/domain/services/membresia-usuario.service.domain';
import { ActivatedRoute, Router } from '@angular/router';
import { MembresiaUsuarioDomainEntity } from 'src/app/domain/entities/membresia-usuario.entity.domain';
import { IUsuarioTokenDomain } from 'src/app/domain/interfaces/usuario.token.interface.domain';
import { usuarioUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-usuario/delegate-usuario.infrastructure';
import { UsuarioService } from 'src/app/domain/services/usuario.service.domain';
import { UpdateUsuarioDto } from 'src/app/infrastructure/dto/create/update-usuario.dto';
import { membresiaUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-membresia/delegate-membresia.infrastructure';
import { MembresiaService } from 'src/app/domain/services/membresia.service.domain';
import { MembresiaDomainEntity } from 'src/app/domain/entities/membresia.entity.domain';
import { UsuarioDomainEntity } from 'src/app/domain/entities/usuario.entity.domain';

@Component({
  selector: 'app-create-membresia-usuario',
  templateUrl: './create-membresia-usuario.component.html',
  styleUrls: ['./create-membresia-usuario.component.css'],
})
export class CreateMembresiaUsuarioComponent implements OnInit {
  delegateMembresiaUsuario = membresiaUsuarioUseCaseProviders;
  delegateMembresia = membresiaUseCaseProviders;
  delegateUsuario = usuarioUseCaseProviders;
  delegateLogin = loginUseCaseProviders;
  sweet = new SweetAlert();
  updateUsuario: UpdateUsuarioDto = {} as UpdateUsuarioDto;
  membresiaUsuario: CrearMembresiaUsuarioDto = {
    email: '',
    nombre: '',
  };

  constructor(
    private readonly membresiaUsuarioService: MembresiaUsuarioService,
    private readonly membresiaService: MembresiaService,
    private readonly usuarioService: UsuarioService,
    private router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (
      this.activatedRoute.snapshot.params['nombreMembresia'] == null ||
      this.activatedRoute.snapshot.params['usuarioActual'] == null
    ) {
      this.router.navigate(['/membresia/get-all']);
    } else {
      this.membresiaUsuario.nombre =
        this.activatedRoute.snapshot.params['nombreMembresia'];
      this.membresiaUsuario.email =
        this.activatedRoute.snapshot.params['usuarioActual'];
      this.asignarMembresiaUsuario();
      this.router.navigate(['/membresia/get-all']);
    }
  }

  asignarMembresiaUsuario() {
    this.delegateMembresiaUsuario.createMembresiaUsuarioUseCaseProvider
      .useFactory(this.membresiaUsuarioService)
      .execute(this.membresiaUsuario)
      .subscribe({
        next: (data: MembresiaUsuarioDomainEntity) => {
          this.sweet.toFire(
            'Membresia Usuario',
            'Membresia asignada correctamente ',
            'success'
          );
          this.updateRolUsaurio(this.membresiaUsuario.nombre, this.membresiaUsuario.email);
          this.router.navigate([`/membresia/get-all`]);
        },
        error: (err) => {
          this.sweet.toFire(
            'membresia',
            'Error en la Membresia Usuario ' + err,
            'error'
          );
        },
        complete: () => {
          this.sweet.toFire(
            'membresia',
            'Usuario Inscrito Correctamente',
            'success'
          );
          //this.router.navigate([`/membresia/get/${this.membresiaUsuario.membresia}`]);
          this.router.navigate([`/membresia/get-all`]);
        },
      });
  }

  updateRolUsaurio(nombreMembresia: string ,email: string) {
   
    if (nombreMembresia == "SOCIO EDUCADOR") {
      this.updateUsuario.tipo_usuario = 2;
    }
    if (nombreMembresia == "SOCIO PROMOTOR") {
      this.updateUsuario.tipo_usuario = 3;
    }
    if (nombreMembresia == "EMPRENDEDOR") {
      this.updateUsuario.tipo_usuario = 4;
    }
    if (nombreMembresia == "SOCIO BASICO") {
      this.updateUsuario.tipo_usuario = 5;
    }
    if (nombreMembresia == "EDUCADOR") {
      this.updateUsuario.tipo_usuario = 6;
    }
    this.delegateUsuario.updateUsuarioUseCaseProvider
      .useFactory(this.usuarioService)
      .execute(email, this.updateUsuario).subscribe({
        next: (v: UsuarioDomainEntity) => {
          this.sweet.toFire(
            'Usuario',
            'Felicitaciones ',
            'success'
          );
        },
        error: () => {
          this.sweet.toFire(
            'Usuario',
            'Ups Ocurrio un error ',
            'error'
          );
        },
      })
  }
}
