import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { InscribirUsuarioCursoComponent } from './inscribir-usuario-curso/inscribir-usuario-curso.component';
import { AdminCursoComponent } from './admin-cursos/admin-curso.component';
import { AdminUsuarioComponent } from './admin-usuarios/admin-usuario.component';
import { PermissionLogeadoGuard } from '../shared/guards/permission-logeado.guard';
import { PermissionRolAdminGuard } from '../shared/guards/permission-rol-admin.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: `registrar`,
        component: CreateUserComponent,
      },
      {
        path: `invitacion/:id`,
        component: CreateUserComponent,
      },
      {
        path: `inscribir/:tituloCurso`,
        component: InscribirUsuarioCursoComponent,
       // canActivate: [PermissionLogeadoGuard, PermissionRolGuard],
      },
      {
        path: `adminCurso`,
        component: AdminCursoComponent,
        canActivate: [PermissionLogeadoGuard, PermissionRolAdminGuard],

      },
      {
        path: `adminUsuario`,
        component: AdminUsuarioComponent,
        canActivate: [PermissionLogeadoGuard, PermissionRolAdminGuard],
      },

      { path: `**`, redirectTo: 'create' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingUsuarioModule {}
