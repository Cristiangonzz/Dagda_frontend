import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionLogeadoGuard } from '../shared/guards/permission-logeado.guard';
import { CreateMembresiaComponent } from './crear-membresia/create-membresia.component';
import { GetAllMembresiaComponent } from './get-all-membresia/get-all-membresia.component';
import { UpdateMembresiaComponent } from './update-membresia/update-membresia.component';
import { GetMembresiaComponent } from './get-membresia/get-membresia.component';
import { PermissionRolAdminGuard } from '../shared/guards/permission-rol-admin.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: `create`,
        component: CreateMembresiaComponent,
        canActivate: [PermissionLogeadoGuard, PermissionRolAdminGuard],
      },
      {
        path: `get-all`,
        component: GetAllMembresiaComponent,
        canActivate: [PermissionLogeadoGuard],
      },
      {
        path: `get/:nombre`,
        component: GetMembresiaComponent,
        // canActivate: [PermissionLogeadoGuard],
      },
      {
        path: `update`,
        component: UpdateMembresiaComponent,
         canActivate: [PermissionLogeadoGuard,PermissionRolAdminGuard],
      },
      { path: `**`, redirectTo: 'get-all' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingMembresiaModule {}
