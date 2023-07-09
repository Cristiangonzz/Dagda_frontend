import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { SweetAlert } from '../../shared/sweetAlert/sweet-alert.presentation';
import Swal from 'sweetalert2';
import { MembresiaDomainEntity } from 'src/app/domain/entities/membresia.entity.domain';
import { membresiaUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-membresia/delegate-membresia.infrastructure';
import { MembresiaService } from 'src/app/domain/services/membresia.service.domain';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrearMembresiaUsuarioDto } from 'src/app/infrastructure/dto/create/create-membresia-usuario.dto';

@Component({
  selector: 'app-admin-membresia',
  templateUrl: './admin-membresia.component.html',
  styleUrls: ['./admin-membresia.component.css'],
})
export class AdminMembresiaComponent implements OnInit, OnDestroy, AfterViewInit {
  membresias!: MembresiaDomainEntity[];
  delegateMembresia = membresiaUseCaseProviders;
  viewFormulario: boolean = false;
  usuarioMembresia!: CrearMembresiaUsuarioDto;
  sweet = new SweetAlert();
  private onDestroy$: Subject<void> = new Subject<void>();

  FormRegister = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.email]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
   
    
  });
 
  suscription!: Subscription;
  constructor(
    private membresiaService: MembresiaService,
    private router: Router,
  ) {}

  ngAfterViewInit(): void {
    window.scrollTo(0, 0); // Renderizar hacia arriba de la pantalla  
  }
 
  ngOnInit() {
    this.getAllMembresiaAdmin();
    
  }

  getAllMembresiaAdmin() {
    this.delegateMembresia.getAllMembresiaUseCaseProvider.useFactory(
      this.membresiaService
    ).execute();

    this.delegateMembresia.getAllMembresiaUseCaseProvider
    .useFactory(this.membresiaService)
      .statusEmmit.pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (value: MembresiaDomainEntity[]) => {
          this.membresias = value;
        },
        error: () => {
          this.sweet.toFire('Membresia', 'Error al Obtener Membresia', 'error');
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
                'Curso Eliminado Correctamente',
                'success'
              );
              this.refresh();
            },
            error: (error) => {
              this.sweet.toFire('Curso', error.message, 'error');
            },
            complete: () => {
              this.sweet.toFire(
                'Membresia',
                'Membresia Eliminado Correctamente',
                'success'
              );
              this.refresh();
            },
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  crearMembresia() {
    this.router.navigate(['curso/create']);
  }
  refresh() {
    this.delegateMembresia.getAllMembresiaUseCaseProvider.useFactory(
      this.membresiaService
    ).execute();
  }

//funciones para editar curso
modalTitulo!: boolean;
datoModalTitulo!: string;
editarCursoTitulo(titulo: string) {
  this.modalTitulo = !this.modalTitulo;
  this.datoModalTitulo = titulo;
}

editarMembresia(titulo : string){
  this.router.navigate([`curso/update/${titulo}`]);
}

mostrarFormulario(){
  this.viewFormulario = !this.viewFormulario;
}
send(){
  this.usuarioMembresia.email = this.FormRegister.get('email')?.value as string;
  this.usuarioMembresia.nombre = this.FormRegister.get('nombre')?.value as string;
  console.log(this.usuarioMembresia.email)
  console.log(this.usuarioMembresia.nombre)

  this.router.navigate([`membresia-usuario/create/${this.usuarioMembresia.nombre}/${this.usuarioMembresia.email}`]);
  this.mostrarFormulario();

}








}
