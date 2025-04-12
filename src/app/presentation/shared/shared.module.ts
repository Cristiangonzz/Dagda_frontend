import { NgModule } from '@angular/core';
import { FormComponent } from './form/form.component';
import { SponsorsComponent } from './sponsors/sponsor.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CalendarioComponent } from './calendar/calendario.component';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


@NgModule({
  declarations: [
    FormComponent,
    NavbarComponent,
    FooterComponent,
    SponsorsComponent,
    CalendarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    
  ],
  exports: [ 
    FormComponent,
    NavbarComponent,
    FooterComponent,
    SponsorsComponent,
    CalendarioComponent],
})
export class SharedModule {}
