import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetAlert } from '../../shared/sweetAlert/sweet-alert.presentation';
import { UsuarioService } from 'src/app/domain/services/usuario.service.domain';
import { usuarioUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-usuario/delegate-usuario.infrastructure';
import { cursoUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-curso/delegate-course.infrastructure';
import { CategoriaService } from 'src/app/domain/services/categoria.service.domain';
import { categoriaUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-categoria/delegate-categoria.infrastructure';
import { CrearCategoriaDto } from 'src/app/infrastructure/dto/create/create-categoria.dto';




@Component({
  selector: 'app-create-categoria',
  templateUrl: './create-categoria.component.html',
  styleUrls: ['./create-categoria.component.css'],
})
export class CreateCategoriaComponent implements  AfterViewInit{
  delegateCurso = cursoUseCaseProviders;
  delegateCategoria = categoriaUseCaseProviders;
  delegateUsuario = usuarioUseCaseProviders;
  categorias!: string[];
  @Output() confirmarCreacion = new EventEmitter<void>();

  sweet = new SweetAlert();

  FormCategoria = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
  });
 
  newCategoria: CrearCategoriaDto = {} as CrearCategoriaDto;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private readonly usuarioService: UsuarioService
  ) {}
  
  ngAfterViewInit(): void {
   window.scrollTo(0, 0);
  }

  send() {
  
    this.newCategoria.nombre = this.FormCategoria.get('nombre')?.value as string;

    this.delegateCategoria.createCategoriaUseCaseProvider.useFactory(this.categoriaService)
      .execute(this.newCategoria)
      .subscribe({
        next: () => {
          this.sweet.toFire('Completo', 'Categoria Creada', 'success');
          this.router.navigate(['/categoria/get-all']);
          this.actualizarTabla();
        },
        error: (err) => {
          this.sweet.toFire('Incompleto', 'Error al Crear Categoria', 'error');
          console.log(err);
        },
      });
      this.confirmarCreacion.emit();
  }
  actualizarTabla(){
    this.delegateCategoria
    .getAllCategoriaUseCaseProvider
    .useFactory(this.categoriaService).execute();
  }
  cancelar() {
    this.confirmarCreacion.emit();
    this.router.navigate(['/categoria/get-all']);
  }



}
