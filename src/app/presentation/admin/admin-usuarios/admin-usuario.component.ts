import { AfterViewInit, Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SweetAlert } from '../../shared/sweetAlert/sweet-alert.presentation';
import { UsuarioService } from 'src/app/domain/services/usuario.service.domain';
import { UsuarioDomainEntity } from 'src/app/domain/entities/usuario.entity.domain';
import { usuarioUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-usuario/delegate-usuario.infrastructure';

@Component({
  selector: 'app-admin-usuario',
  templateUrl: './admin-usuario.component.html',
  styleUrls: ['./admin-usuario.component.css'],
})
export class AdminUsuarioComponent implements OnInit , AfterViewInit{
  usuarios!: UsuarioDomainEntity[];
  delegateUsuario = usuarioUseCaseProviders;
  sweet = new SweetAlert();
 

  


  
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
  ) {}

  ngAfterViewInit(): void {
    window.scrollTo(0, 0); // Renderizar hacia arriba de la pantalla
  }
 


  ngOnInit() {
    this.getAllCourseAdmin();
    
  }


  getAllCourseAdmin() {
    

    this.delegateUsuario.getAllUsuarioUseCaseProvider.useFactory(
      this.usuarioService
    ).execute().subscribe({
        next: (value: UsuarioDomainEntity[]) => {
          this.usuarios = value;
        },
        error: () => {
          this.sweet.toFire('Usuarios', 'Error al Obtener Usuarios', 'error');
        },
      });
  }


  deleteUsuario(email: string) {
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
        this.delegateUsuario.deleteUsuarioUseCaseProvider
          .useFactory(this.usuarioService)
          .execute(email)
          .subscribe({
            next: () => {
              this.sweet.toFire(
                'Usuario',
                'Usuario Eliminado Correctamente',
                'success'
              );
              this.refresh();
            },
            error: (error) => {
              this.sweet.toFire('Curso', error.message, 'error');
            },
            complete: () => {
              this.sweet.toFire(
                'Curso',
                'Usuario Eliminado Correctamente',
                'success'
              );
              this.refresh();
            },
          });
      }
    });
  }

 

  crearCurso() {
    this.router.navigate(['curso/create']);
  }
  refresh() {
    this.delegateUsuario.getAllUsuarioUseCaseProvider.useFactory(
      this.usuarioService
    ).execute().subscribe({
        next: (value: UsuarioDomainEntity[]) => {
          this.usuarios = value;
        }
      });

  }

//funciones para editar curso


editarUsuario(email : string){

  this.router.navigate([`usuario/update/${email}`]);
}









}
