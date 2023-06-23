import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './presentation/shared/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { NavbarComponent } from './presentation/shared/navbar/navbar.component';
import { CarritoModule } from "./presentation/carrito/carrito.module";

@NgModule({
    declarations: [AppComponent, NavbarComponent, FooterComponent],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        InfrastructureModule,
        BrowserAnimationsModule,
        CarritoModule,//voy a tener que sacar el carrito de aca
    ]
})
export class AppModule {}
