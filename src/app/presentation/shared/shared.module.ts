import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { SponsorsComponent } from './sponsors/sponsor.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    FormComponent,
    NavbarComponent,
    FooterComponent,
    SponsorsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ 
    FormComponent,
    NavbarComponent,
    FooterComponent,
    SponsorsComponent],
})
export class SharedModule {}
