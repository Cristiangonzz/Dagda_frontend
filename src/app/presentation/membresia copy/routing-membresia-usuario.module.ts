import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionLogeadoGuard } from '../shared/guards/permission-logeado.guard';
import { CreateMembresiaUsuarioComponent } from './crear-membresia-usuario/create-membresia-usuario.component';
import { GetMembresiaUsuarioComponent } from './get-membresia-usuario/get-membresia-usuario.component';
import { PermissionRolAdminGuard } from '../shared/guards/permission-rol-admin.guard';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: `create/:nombreMembresia/:posicionMembresia/:usuarioActual`,
        component: CreateMembresiaUsuarioComponent,
        canActivate: [PermissionLogeadoGuard, PermissionRolAdminGuard],
      },

      {
        path: `get/:id`,
        component: GetMembresiaUsuarioComponent,
        canActivate: [PermissionLogeadoGuard],
      },

      { path: `**`, redirectTo: 'get-all' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingMembresiaUsuarioModule {}
