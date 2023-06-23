import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackGuard } from './presentation/shared/guards/back.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [BackGuard],
    loadChildren: () =>
      import('./presentation/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'referencia',
   // canActivate: [BackGuard],
    loadChildren: () =>
      import('./presentation/usuario-referencia/usuario-referencia.module').then((m) => m.UsuarioReferenciaModule),
  },
  {
    path: 'usuario',
    // canActivate: [PermissionLogeadoGuard],
    loadChildren: () =>
      import('./presentation/admin/usuario.module').then(
        (m) => m.UsuarioModule
      ),
  },
  {
    path: 'curso',
    // canActivate: [PermissionLogeadoGuard],
    loadChildren: () =>
      import('./presentation/course/curso.module').then((m) => m.CursoModule),
  },
  {
    path: 'membresia',
    //  canActivate: [PermissionLogeadoGuard],
    loadChildren: () =>
      import('./presentation/membresia/membresia.module').then(
        (m) => m.MembresiaModule
      ),
  },
  {
    path: 'membresia-usuario',
    //  canActivate: [PermissionLogeadoGuard],
    loadChildren: () =>
      import('./presentation/membresia copy/membresia-usuario.module').then(
        (m) => m.MembresiaUsuarioModule
      ),
  },
  {
    path: 'carrito',
    loadChildren: () =>
      import('./presentation/carrito/carrito.module').then(
        (m) => m.CarritoModule
      ),
  },
  {
    path: 'categoria',
    loadChildren: () =>
      import('./presentation/categoria/categoria.module').then(
        (m) => m.CategoriaModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./presentation/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
