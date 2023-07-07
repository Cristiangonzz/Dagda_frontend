import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CreateCursoComponent } from './create-curso/create-curso.component';
import { RoutingCourseModule } from './routing-course.module';
import { GetAllCursoComponent } from './get-all-curso/get-all-curso.component';
import { GetCursoComponent } from './get-curso/get-curso.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DeleteCursoComponent } from './delete-curso/delete-curso.component';
import {UpdateCourseComponent } from './update-course/update-course.component';
import { ProgramaCursoComponent } from './programa-curso/programa-curso.component';

@NgModule({
  declarations: [
    CreateCursoComponent,
    DeleteCursoComponent,
    UpdateCourseComponent,
    GetCursoComponent,
    GetAllCursoComponent,
    ProgramaCursoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RoutingCourseModule,
    SharedModule,
    AngularEditorModule,
  ],
  exports: [
    CreateCursoComponent,
    DeleteCursoComponent,
    UpdateCourseComponent,
    GetCursoComponent,
    GetAllCursoComponent,
    ProgramaCursoComponent,
  ],
})
export class CursoModule {}
