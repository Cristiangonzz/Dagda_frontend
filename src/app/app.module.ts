import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { SharedModule } from './presentation/shared/shared.module';
@NgModule({
    declarations: [AppComponent,],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        InfrastructureModule,
        BrowserAnimationsModule,
        SharedModule,
    
    ]
})
export class AppModule {}
