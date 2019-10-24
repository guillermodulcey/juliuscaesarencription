import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EncryptionModule } from './encryption/encryption.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, EncryptionModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
