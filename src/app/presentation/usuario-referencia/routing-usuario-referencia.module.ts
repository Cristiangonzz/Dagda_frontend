import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionLogeadoGuard } from '../shared/guards/permission-logeado.guard';
import { UsuarioReferenciaComponent } from './clientes-usuario-referencias/usuario-referencia.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'planilla',
        component: UsuarioReferenciaComponent,
        canActivate: [PermissionLogeadoGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingUsuarioReferenciaModule {}
