import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InfrastructureModule } from 'src/app/infrastructure/infrastructure.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { RoutingUsuarioModule } from './routing-usuario.module';
import { InscribirUsuarioCursoComponent } from './inscribir-usuario-curso/inscribir-usuario-curso.component';
import { AdminCursoComponent } from './admin-cursos/admin-curso.component';
import { AdminUsuarioComponent } from './admin-usuarios/admin-usuario.component';
@NgModule({
  declarations: [
    CreateUserComponent,
    InscribirUsuarioCursoComponent,
    AdminCursoComponent,
    AdminUsuarioComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    RoutingUsuarioModule,
    InfrastructureModule,
  ],
  exports: [
    CreateUserComponent,
    InscribirUsuarioCursoComponent,
    AdminCursoComponent,
    AdminUsuarioComponent,
  ],
})
export class UsuarioModule {}
