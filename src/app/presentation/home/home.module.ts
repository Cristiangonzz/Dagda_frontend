import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { RoutingHomeModule } from './routing-home.module';
import { CursoModule } from '../course/curso.module';
import { PresentacionComponent } from './presentacion/presentacion.component';
import { TituloComponent } from './titulo/titulo.component';

@NgModule({
  declarations: [HomeComponent,PresentacionComponent,TituloComponent],
  imports: [
    CommonModule,
    RoutingHomeModule,
    SharedModule,
    CursoModule,
  ],
  exports: [HomeComponent,PresentacionComponent,TituloComponent],
})
export class HomeModule {}
