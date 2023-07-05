import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/domain/services/curso.service.domain';
import { SweetAlert } from '../../shared/sweetAlert/sweet-alert.presentation';
import { cursoUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-curso/delegate-course.infrastructure';
import { CursoDomainEntity } from 'src/app/domain/entities/curso.entity.domain';
import { UpdateCursoDto } from 'src/app/infrastructure/dto/create/update-curso.dto';
import { data } from 'jquery';
import { categoriaUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-categoria/delegate-categoria.infrastructure';
import { CategoriaService } from 'src/app/domain/services/categoria.service.domain';
import { CategoriaDomainEntity } from 'src/app/domain/entities/categoria.entity.domain';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css'],
})
export class UpdateCourseComponent implements OnInit {
  delegateCurso = cursoUseCaseProviders;
  delegateCategoria = categoriaUseCaseProviders;
  cursoUpdate: UpdateCursoDto = {} as UpdateCursoDto;
  curso: CursoDomainEntity = {} as CursoDomainEntity;
  categorias!: string[];
  tituloPro: string[] = [];
  descripcionPro: string[] = [];
  public sweetAlert = new SweetAlert();

  FormUpdate = new FormGroup({
      titulo: new FormControl('', [Validators.required, Validators.minLength(1)]),
      descripcion: new FormControl(''),
      categoria: new FormControl(''),
      detalle: new FormControl(''),
      precio: new FormControl<number>(0, [Validators.required]),
      tituloPrograma: new FormArray([], [Validators.required]),
      descripcionPrograma: new FormArray([], [Validators.required]),
    });

  constructor(
    private cursoService: CursoService,
    private router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private categoriaService: CategoriaService,
  ) {
     
  }
  ngOnInit(): void {

    this.buscarCurso();
    this.recargarCategorias();
    
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
    return this.FormUpdate.get('tituloPrograma') as FormArray;
  }
  
  get descripcionProgramaForms() {
    return this.FormUpdate.get('descripcionPrograma') as FormArray;
  }

  recargarCategorias(){
    this.delegateCategoria.getAllCategoriaUseCaseProvider
      .useFactory(this.categoriaService).execute();
     this.delegateCategoria.getAllCategoriaUseCaseProvider
      .useFactory(this.categoriaService)
      .statusEmmit.subscribe({
        next: (value: CategoriaDomainEntity[]) => {
          this.categorias = value.map((x) => x.nombre);
          
        },
      });
  }
  buscarCurso() {
    this.delegateCurso.GetCursoByNameUseCaseProvider.useFactory(
      this.cursoService
    )
      .execute(this.activatedRoute.snapshot.params['titulo'])
      .subscribe({
        next: (data: CursoDomainEntity) => {
          this.curso = data;
          data.programa.forEach((element) => {
            const titulo = new FormControl(element.tituloPrograma, [
              Validators.required,
              Validators.minLength(2),
            ]);
            const descripcion = new FormControl(element.descripcionPrograma, [
              Validators.required,
              Validators.minLength(2),
            ]);
            this.tituloProgramaForms.push(titulo);
            this.descripcionProgramaForms.push(descripcion);
          });
          this.FormUpdate.patchValue({
            titulo: data.titulo,
            descripcion: data.descripcion,
            detalle: data.detalle,
            precio: data.precio,
          });
         
        },
        error: (error) => {
          this.sweetAlert.toFire(
            'Error',
            'No se pudo encontrar Curso ',
            'error'
          );
        },
      });
  }


  send() {
    if (
      this.curso.descripcion !=
      (this.FormUpdate.get('descripcion')?.value as string)
    )
      this.cursoUpdate.descripcion = this.FormUpdate.get('descripcion')
        ?.value as string;

    if (this.curso.precio != (this.FormUpdate.get('precio')?.value as number))
      this.cursoUpdate.precio = this.FormUpdate.get('precio')
        ?.value as number;

    if (
      this.curso.detalle != (this.FormUpdate.get('detalle')?.value as string)
    )
      this.cursoUpdate.detalle = this.FormUpdate.get('detalle')
        ?.value as string;

    if (this.curso.titulo != (this.FormUpdate.get('titulo')?.value as string))
      this.cursoUpdate.titulo = this.FormUpdate.get('titulo')
        ?.value as string;

    // if(this.curso.imagen != this.cursoUpdate.imagen){
    //   this.cursoUpdate.imagen = this.curso.imagen;
    // }

    if(this.curso.programa.length != this.tituloProgramaForms.length){

    this.cursoUpdate.tituloPrograma = this.FormUpdate.get('tituloPrograma')?.value as string[];
    this.cursoUpdate.descripcionPrograma = this.FormUpdate.get('descripcionPrograma')?.value as string[];

    }

    console.log("los datos para editar curso",this.cursoUpdate);



    this.delegateCurso.UpdateCursoUseCaseProvider.useFactory(this.cursoService)
      .execute(this.curso.titulo, this.cursoUpdate)
      .subscribe({
        next: () => {
          this.sweetAlert.toFire('Completo', 'Curso Actualizado', 'success');
          this.router.navigate(['/usuario/adminCurso']);
        },
        error: (err) => {
          this.sweetAlert.toFire('Error', 'No se puedo actualizar curso', 'error');
          
          this.router.navigate(['/usuario/adminCurso']);
        },
      });
  }
  cancelar() {
    this.router.navigate(['/usuario/adminCurso']);
  }

  //iamgen
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
        },
        error: (error) => {
          this.sweetAlert.toFire('Imagen', 'Error al Guardar Imagen', 'error');
          console.error(error);
        }
      });
  }
 
}
