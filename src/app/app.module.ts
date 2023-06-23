import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
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
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        BrowserAnimationsModule,
        CarritoModule,
    ]
})
export class AppModule {}
