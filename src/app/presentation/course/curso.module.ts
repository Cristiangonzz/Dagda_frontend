import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { InfrastructureModule } from 'src/app/infrastructure/infrastructure.module';
import { SharedModule } from '../shared/shared.module';
import { CreateCursoComponent } from './create-curso/create-curso.component';
import { RoutingCourseModule } from './routing-course.module';
import { GetAllCursoComponent } from './get-all-curso/get-all-curso.component';
import { GetCursoComponent } from './get-curso/get-curso.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DeleteCursoComponent } from './delete-curso/delete-curso.component';
import {UpdateCourseComponent } from './update-course/update-course.component';

@NgModule({
  declarations: [
    CreateCursoComponent,
    DeleteCursoComponent,
    UpdateCourseComponent,
    GetCursoComponent,
    GetAllCursoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
    RoutingCourseModule,

    InfrastructureModule,
    SharedModule,
    //modulo para el sommer Note
    AngularEditorModule,
  ],
  exports: [],
})
export class CursoModule {}
