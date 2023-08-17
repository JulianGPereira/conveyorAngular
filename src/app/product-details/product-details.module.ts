import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details.component';
import { ProductIncrementService } from '../product-increment.service';
import { BoxMeshService } from '../boxMesh.service';
import { CombinedMeshService } from '../combined-mesh-service';



@NgModule({
  declarations: [
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    ProductDetailsComponent
  ],
  providers:[
    ProductIncrementService,
    BoxMeshService,
    CombinedMeshService 
  ]
})
export class ProductDetailsModule { }
