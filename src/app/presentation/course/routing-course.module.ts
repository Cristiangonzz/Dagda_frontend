import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetAllCursoComponent } from './get-all-curso/get-all-curso.component';
import { PermissionLogeadoGuard } from '../shared/guards/permission-logeado.guard';
import { CreateCursoComponent } from './create-curso/create-curso.component';
import { GetCursoComponent } from './get-curso/get-curso.component';
import { PermissionRolAdminGuard } from '../shared/guards/permission-rol-admin.guard';
import { UpdateCourseComponent } from './update-course/update-course.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create',
        component: CreateCursoComponent,
        canActivate: [PermissionLogeadoGuard, PermissionRolAdminGuard],
      },
      {
        path: 'update/:titulo',
        component: UpdateCourseComponent,
        // canActivate: [PermissionLogeadoGuard],
      },
      // {
      //   path: 'delete',
      //   component: DeleteCourseComponent,
      //   canActivate: [PermissionLogeadoGuard, PermissionRolGuard],
      // },
      {
        path: 'get/:titulo',
        component: GetCursoComponent,
        //canActivate: [PermissionLogeadoGuard],
      },
      {
        path: 'get-all',
        component: GetAllCursoComponent,
      },
      { path: `**`, redirectTo: 'get-all' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingCourseModule {}
