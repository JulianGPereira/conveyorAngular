import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details.component';



@NgModule({
  declarations: [
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    ProductDetailsComponent
  ]
})
export class ProductDetailsModule { }
