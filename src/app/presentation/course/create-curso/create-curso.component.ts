import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetAlert } from '../../shared/sweetAlert/sweet-alert.presentation';
import { UsuarioService } from 'src/app/domain/services/usuario.service.domain';
import { usuarioUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-usuario/delegate-usuario.infrastructure';
import { cursoUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-curso/delegate-course.infrastructure';
import { CursoService } from 'src/app/domain/services/curso.service.domain';
import { CrearCursoDto } from 'src/app/infrastructure/dto/create/create-curso.dto';
import { CategoriaService } from 'src/app/domain/services/categoria.service.domain';
import { categoriaUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-categoria/delegate-categoria.infrastructure';
import { CategoriaDomainEntity } from 'src/app/domain/entities/categoria.entity.domain';




@Component({
  selector: 'app-create-curso',
  templateUrl: './create-curso.component.html',
  styleUrls: ['./create-curso.component.css'],
})
export class CreateCursoComponent implements OnInit ,AfterViewInit{
  delegateCurso = cursoUseCaseProviders;
  delegateCategoria = categoriaUseCaseProviders;
  delegateUsuario = usuarioUseCaseProviders;
  categorias!: string[];

  sweet = new SweetAlert();

  FormRegister = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.minLength(1)]),
    descripcion: new FormControl(''),
    categoria: new FormControl('', [Validators.required]),
    detalle: new FormControl(''),
    precio: new FormControl<number>(0, [Validators.required]),
    tituloPrograma: new FormArray([], [Validators.required]),
    descripcionPrograma: new FormArray([], [Validators.required]),
    
  });
 
  curso: CrearCursoDto = {} as CrearCursoDto;

  constructor(
    private cursoService: CursoService,
    private categoriaService: CategoriaService,
    private router: Router,
    private readonly usuarioService: UsuarioService
  ) {}
  ngAfterViewInit(): void {
   window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.addContenidoPrograma();
    this.delegateCategoria.getAllCategoriaUseCaseProvider
      .useFactory(this.categoriaService)
      .execute();
    this.delegateCategoria.getAllCategoriaUseCaseProvider
      .useFactory(this.categoriaService)
      .statusEmmit.subscribe({
        next: (value: CategoriaDomainEntity[]) => {
          this.categorias = value.map((x) => x.nombre);
        },
      });
  }
  
  imageData!:FormData;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.imageData = new FormData();
    this.imageData.append('image', file);
 
  
    
    this.delegateCurso.GuardarImagenCursoUseProvider
      .useFactory(this.cursoService)
      .execute(this.imageData)
      .subscribe({
        next: (value:any) => {
          this.curso.imagen = value.filename;
          console.log("imagen",this.curso.imagen);
         
        },
        error: (error) => {
          this.sweet.toFire('Imagen', 'Error al Guardar Imagen', 'error');
          console.error(error);
        }
      });
  }
 
  addContenidoPrograma() {
    const titulo = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]);
    const descripcion = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]);
    this.tituloProgramaForms.push(titulo);
    this.descripcionProgramaForms.push(descripcion);
  }

  removeContenidoPrograma(i: number) {
    this.tituloProgramaForms.removeAt(i);
    this.descripcionProgramaForms.removeAt(i);
  }

  get tituloProgramaForms() {
    return this.FormRegister.get('tituloPrograma') as FormArray;
  }
  get descripcionProgramaForms() {
    return this.FormRegister.get('descripcionPrograma') as FormArray;
  }
  send() {
  
    this.curso.descripcion = this.FormRegister.get('descripcion')
      ?.value as string;
    this.curso.precio = this.FormRegister.get('precio')?.value as number;
    this.curso.detalle = this.FormRegister.get('detalle')?.value as string;
    this.curso.tituloPrograma = this.FormRegister.get('tituloPrograma')?.value as string[];
    this.curso.descripcionPrograma = this.FormRegister.get('descripcionPrograma')?.value as string[];
    this.curso.categoria = this.FormRegister.get('categoria')?.value as string;
    this.curso.titulo = this.FormRegister.get('titulo')?.value as string;
console.log(this.curso);
    this.delegateCurso.CreateCursoUseCaseProvider.useFactory(this.cursoService)
      .execute(this.curso)
      .subscribe({
        next: () => {
          this.sweet.toFire('Completo', 'Curso Creado', 'success');
          this.router.navigate(['/curso/get-all']);
        },
        error: (err) => {
          this.sweet.toFire('Error', 'Error al Crear Curso', 'error');
          console.log(err);
        },
      });
  }
  cancelar() {
    this.router.navigate(['/curso/get-all']);
  }



}
