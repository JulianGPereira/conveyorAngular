import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProductDetailsModule } from './product-details/product-details.module';
import { NewProductModule } from './new-product/new-product.module';
import { CheckStageModule } from './check-stage/check-stage.module';
import { ResultsBarModule } from './results-bar/results-bar.module';
import { MySceneModule } from './my-scene/my-scene.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductDetailsModule,
    NewProductModule,
    CheckStageModule,
    ResultsBarModule,
    MySceneModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
