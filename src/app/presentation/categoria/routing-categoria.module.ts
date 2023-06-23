import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionLogeadoGuard } from '../shared/guards/permission-logeado.guard';
import { PermissionRolAdminGuard } from '../shared/guards/permission-rol-admin.guard';
import { CreateCategoriaComponent } from './create/create-categoria.component';
import { TablaCategoriaComponent } from './tabla/tabla-categoria.component';

const routes: Routes = [
  {
    path: '',
    children: [
     
      {
        path: `create`,
        component: CreateCategoriaComponent,
        canActivate: [PermissionLogeadoGuard, PermissionRolAdminGuard],

      },
      {
        path: `get-all`,
        component: TablaCategoriaComponent,
        canActivate: [PermissionLogeadoGuard, PermissionRolAdminGuard],

      },
      { path: `**`, redirectTo: 'get-all' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingCategoriaModule {}
