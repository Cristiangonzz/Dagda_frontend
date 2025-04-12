import { Component, Input, OnInit } from '@angular/core';
import { membresiaUsuarioUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-membresia-usuario/delegate-membresia-usuario.infrastructure';
import { loginUseCaseProviders } from 'src/app/infrastructure/delegate/delegete-login/delegate-login.infrastructure';
import { SweetAlert } from '../../shared/sweetAlert/sweet-alert.presentation';
import { CrearMembresiaUsuarioDto } from 'src/app/infrastructure/dto/create/create-membresia-usuario.dto';
import { MembresiaUsuarioService } from 'src/app/domain/services/membresia-usuario.service.domain';
import { MembresiaUsuarioDomainEntity } from 'src/app/domain/entities/membresia-usuario.entity.domain';
import { IUsuarioTokenDomain } from 'src/app/domain/interfaces/usuario.token.interface.domain';
import { usuarioUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-usuario/delegate-usuario.infrastructure';
import { UsuarioService } from 'src/app/domain/services/usuario.service.domain';
import { UpdateUsuarioDto } from 'src/app/infrastructure/dto/create/update-usuario.dto';
import { membresiaUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-membresia/delegate-membresia.infrastructure';
import { MembresiaService } from 'src/app/domain/services/membresia.service.domain';
import { UsuarioDomainEntity } from 'src/app/domain/entities/usuario.entity.domain';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetMembresiaUsuarioIncripcionDTO } from 'src/app/infrastructure/dto/get/get-usuario-membresia-email-nombre.dto';
import Swal from 'sweetalert2';
import { IUsuarioDomain } from 'src/app/domain/interfaces/usuario.interface.domain';

import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-create-membresia-usuario',
  templateUrl: './create-membresia-usuario.component.html',
  styleUrls: ['./create-membresia-usuario.component.css'],
})
export class CreateMembresiaUsuarioComponent implements OnInit {
  @Input() asignar: boolean =false;
  mostrarFormulario !: boolean;
  delegateMembresiaUsuario = membresiaUsuarioUseCaseProviders;
  delegateMembresia = membresiaUseCaseProviders;
  delegateUsuario = usuarioUseCaseProviders;
  delegateLogin = loginUseCaseProviders;
  rolUsuario!: number;
  sweet = new SweetAlert();
  updateUsuario: UpdateUsuarioDto = {} as UpdateUsuarioDto;
  membresiaUsuario: CrearMembresiaUsuarioDto = {
    email: '',
    nombre: '',
  };
  

  FormRegister = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.email,
    ]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  constructor(
    private readonly membresiaUsuarioService: MembresiaUsuarioService,
    private readonly membresiaService: MembresiaService,
    private readonly usuarioService: UsuarioService,
    private router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.mostrarFormulario = this.asignar;
    if (
      (this.activatedRoute.snapshot.params['nombreMembresia'] == null ||
      this.activatedRoute.snapshot.params['usuarioActual'] == null) &&
        this.asignar === false
    ) {
      this.router.navigate(['/membresia/get-all']);
    }
    if (this.asignar === false) {
      this.membresiaUsuario.nombre =
        this.activatedRoute.snapshot.params['nombreMembresia'];
      this.membresiaUsuario.email =
        this.activatedRoute.snapshot.params['usuarioActual'];
      console.log(
        'datos para crear la membresia usuario: ',
        this.membresiaUsuario
      );
      this.getUsuario();
      this.router.navigate(['/membresia/get-all']);
    }
    this.asignar = false;
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
          this.updateRolUsaurio(
            this.membresiaUsuario.nombre,
            this.membresiaUsuario.email
          );
          this.router.navigate([`/membresia-usuario/create`]);
        },
        error: () => {
          this.sweet.toFire(
            'membresia',
            'Error en la Membresia Usuario',
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

  updateRolUsaurio(nombreMembresia: string, email: string) {
    if (nombreMembresia == 'SOCIO EDUCADOR') {
      this.updateUsuario.tipo_usuario = 2;
    }
    if (nombreMembresia == 'SOCIO PROMOTOR') {
      this.updateUsuario.tipo_usuario = 3;
    }
    if (nombreMembresia == 'EMPRENDEDOR') {
      this.updateUsuario.tipo_usuario = 4;
    }
    if (nombreMembresia == 'SOCIO BASICO') {
      this.updateUsuario.tipo_usuario = 5;
    }
    if (nombreMembresia == 'EDUCADOR') {
      this.updateUsuario.tipo_usuario = 6;
    }
    this.delegateUsuario.updateUsuarioUseCaseProvider
      .useFactory(this.usuarioService)
      .execute(email, this.updateUsuario)
      .subscribe({
        next: (v: UsuarioDomainEntity) => {
          this.sweet.toFire('Usuario', 'Felicitaciones ', 'success');
        },
        error: () => {
          this.sweet.toFire('Usuario', 'Ups Ocurrio un error ', 'error');
        },
      });
  }

  send() {
    
    this.membresiaUsuario.email = this.FormRegister.get('email')
      ?.value as string;
    this.membresiaUsuario.nombre = this.FormRegister.get('nombre')
      ?.value as string;
      console.log(this.membresiaUsuario.email, this.membresiaUsuario.nombre)
      this.getUsuario();
    
  }
  usuarioTieneMembresia(email: string) {
    console.log('rol de usuario', this.rolUsuario);
    let nombre: string = '';
    if(this.rolUsuario === 0){
      this.asignarMembresiaUsuario();
      return;
    }
    if(this.rolUsuario === 1){
      this.sweet.toFire(
        'Usuario Administrador',
        'Usuario Administrador no puede inscribirse a una membresia',
        'warning'
      );
      this.router.navigate([`/usuario/adminMembresia`]);
      return;
    }
    if(this.rolUsuario === 2){
      nombre = 'SOCIO EDUCADOR';
    }
    if(this.rolUsuario === 3){
       nombre = 'SOCIO PROMOTOR';
    }
    if(this.rolUsuario === 4){
       nombre = 'EMPRENDEDOR';
    }
    if(this.rolUsuario === 5){
       nombre = 'SOCIO BASICO';
    }
    if(this.rolUsuario === 6){
       nombre = 'EDUCADOR';
    }
    let membresia: GetMembresiaUsuarioIncripcionDTO = {
    email: email,
    nombre: nombre
    }
    this.delegateMembresiaUsuario.getMembresiaUsuarioIncripcionUseCaseProvider
    .useFactory(this.membresiaUsuarioService).execute(membresia).subscribe({
      next: (data: MembresiaUsuarioDomainEntity[]) => {
        if(data.length == 0){
          this.asignarMembresiaUsuario();
        }else{
          this.deleteMembresia(data[0].membresiaUsuarioId);
        }
        
      }
    })

  }
  cancelarFormulario(){
    this.router.navigate([`/membresia/get-all`]);
  }

  deleteMembresia(_id: string) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Se eliminara la membresia anterior para asignar la nueva',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#e64141',
    }).then((result) => {
      if (result.isConfirmed) {
        this.delegateMembresiaUsuario.deleteMembresiaUsuarioUseCaseProvider
          .useFactory(this.membresiaUsuarioService)
          .execute(_id)
          .subscribe({
            next: () => {
              this.sweet.toFire(
                'Membresia Usuario',
                'Membresia Eliminada Correctamente',
                'success'
              );
              this.asignarMembresiaUsuario();
            },
            error: (error) => {
              this.sweet.toFire('Membresia', error.message, 'error');
            },
            complete: () => {
              this.sweet.toFire(
                'Membresia Usuario',
                'Membresia Eliminada Correctamente',
                'success'
              );
            },
          });
      }
    });
  }
  getUsuario() {
    this.delegateUsuario.getEmailUsuarioUseCaseProvider
      .useFactory(this.usuarioService)
      .execute(this.membresiaUsuario.email)
      .subscribe({
        next: (value: IUsuarioDomain) => {
          this.rolUsuario = value.tipo_usuario as number;
          this.usuarioTieneMembresia(this.membresiaUsuario.email);
        },
        error: () => {
          this.sweet.toFire(
            'Usuario Incorrecto',
            'Usuario no encontrado',
            'error'
          );
        },
      });
  }
}
