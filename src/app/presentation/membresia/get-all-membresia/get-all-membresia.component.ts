import { Component, OnDestroy, OnInit } from '@angular/core';
import { MembresiaDomainEntity } from 'src/app/domain/entities/membresia.entity.domain';
import { membresiaUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-membresia/delegate-membresia.infrastructure';
import { loginUseCaseProviders } from 'src/app/infrastructure/delegate/delegete-login/delegate-login.infrastructure';
import { SweetAlert } from '../../shared/sweetAlert/sweet-alert.presentation';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { MembresiaService } from 'src/app/domain/services/membresia.service.domain';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { membresiaUsuarioUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-membresia-usuario/delegate-membresia-usuario.infrastructure';
import { MembresiaUsuarioService } from 'src/app/domain/services/membresia-usuario.service.domain';
import { IUsuarioTokenDomain } from 'src/app/domain/interfaces/usuario.token.interface.domain';
import { IPerteneceMembresiaUsuarioDomain } from 'src/app/domain/interfaces/pertenece-membresia-usuario.inteface.domain';
import { IMembresiaUsuarioDomain } from 'src/app/domain/interfaces/membresia-usuario.inteface.domain';
import { UsuarioService } from 'src/app/domain/services/usuario.service.domain';

@Component({
  selector: 'app-get-all-membresia',
  templateUrl: './get-all-membresia.component.html',
  styleUrls: ['./get-all-membresia.component.css'],
})
export class GetAllMembresiaComponent implements OnInit, OnDestroy {
  membresias!: MembresiaDomainEntity[];
  delegateMembresia = membresiaUseCaseProviders;
  delegateMembresiaUsuario = membresiaUsuarioUseCaseProviders;
  delegateLogin = loginUseCaseProviders;
  sweet = new SweetAlert();
  private onDestroy$: Subject<void> = new Subject<void>();
  rol: boolean = false;
  usuarioLogeado: boolean = false;
  usuarioActual: string = '';
  //Un arreglo de que va a diferenciar si el usuario esta suscripto o no a la membresia
  membresiaUsuario: IMembresiaUsuarioDomain[] = [];
  pertenecenUsuarioMembresia: IPerteneceMembresiaUsuarioDomain[] = [];
 rolPerteneceMembresia : number = 0;
  selected!: MembresiaDomainEntity;

  showModal = false;
  suscription!: Subscription;

  openModal(i: number) {
    this.selected = this.membresias[i];
    console.log(this.selected);
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  constructor(
    private membresiaService: MembresiaService,
    private usuarioService: UsuarioService,
    private membresiaUsuarioService: MembresiaUsuarioService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUsuario();
     
    
    
    this.delegateLogin.hasRolUseCaseProvider.useFactory(this.usuarioService).execute();
    this.delegateLogin.hasRolUseCaseProvider
      .useFactory(this.usuarioService)
      .statusRolEmmit.subscribe({
        next: (value: number) => {
          this.rolPerteneceMembresia = value;
          this.getAllMembresia();//cargo todas las membresias
          console.log(this.rolPerteneceMembresia);
          if (value == 1) {
            this.rol = true;
          }
          if (value == -1) {
            this.rol = false;
          }
        },
      }); 
      
     
  }
  openMembresia(nombre: string) {
    this.router.navigate([`/membresia/get/${nombre}`]);
  }

  getAllMembresia() {
    this.delegateMembresia.getAllMembresiaUseCaseProvider
      .useFactory(this.membresiaService)
      .execute();

    this.delegateMembresia.getAllMembresiaUseCaseProvider
      .useFactory(this.membresiaService)
      .statusEmmit.pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (value: MembresiaDomainEntity[]) => {
          this.membresias = value;
          console.log("Dentro de la funcion :",this.rolPerteneceMembresia);
          if(this.rolPerteneceMembresia == 2){
            this.membresias[0].vigente = true;//Socio Promotor
          }else{
            this.membresias[0].vigente = false;
          }
          if(this.rolPerteneceMembresia == 3){
            this.membresias[1].vigente = true;//Socio Basico
          }else{
            this.membresias[1].vigente = false;
          }
          if(this.rolPerteneceMembresia == 4){
            this.membresias[2].vigente = true;//Educador
          }else{
            this.membresias[2].vigente = false;
          }
          if(this.rolPerteneceMembresia == 5){
            this.membresias[3].vigente = true;//Socio Educador
          }else{
            this.membresias[3].vigente = false;
          }
        },
        error: () => {
          this.sweet.toFire('Membresia', 'Error al Obtener Membresias', 'error');
        },
      });
  }
  deleteMembresia(_id: string) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'No podras revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#e64141',
    }).then((result) => {
      if (result.isConfirmed) {
        this.delegateMembresia.deleteMembresiaUseCaseProvider
          .useFactory(this.membresiaService)
          .execute(_id)
          .subscribe({
            next: () => {
              this.sweet.toFire(
                'Membresia',
                'Membresia Eliminada Correctamente',
                'success'
              );
              this.refresh();
              this.router.navigate(['/membresia/get-all']);
            },
            error: (error) => {
              this.sweet.toFire('Membresia', error.message, 'error');
            },
            complete: () => {
              this.sweet.toFire(
                'Membresia',
                'Membresia Eliminado Correctamente',
                'success'
              );
              this.refresh();
              this.router.navigate(['/membresia/get-all']);
            },
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
 

  getUsuario() {
    this.delegateLogin.hasTokenUserUseCaseUseProvider.useFactory().execute();
    this.delegateLogin.hasTokenUserUseCaseUseProvider
      .useFactory()
      .statusTokenEmmit.subscribe({
        next: (value: IUsuarioTokenDomain) => {
          this.usuarioActual = value.usuario?.email!;
        },
      });
  }
  asignarMembresiaUsuario(nombre: string) {
    let posicionMembresia= 0;
    this.membresias.
    forEach((element,index) => {
      if(element.nombre == nombre){
        posicionMembresia = index;
      }
    });


    this.router.navigate([`membresia-usuario/create/${nombre}/${posicionMembresia}/${this.usuarioActual}`]);
  }
  refresh() {
    this.delegateMembresia.getAllMembresiaUseCaseProvider
      .useFactory(this.membresiaService)
      .execute();
  }
}
