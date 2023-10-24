import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatTabsModule} from '@angular/material/tabs';
import { NewProductModule } from './new-product/new-product.module';
import { MySceneModule } from './my-scene/my-scene.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NewProductModule,
    MySceneModule,
    BrowserAnimationsModule,
    MatTabsModule,
      
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
