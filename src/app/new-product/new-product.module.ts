import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProductComponent } from './new-product.component';
import { SceneService } from 'src/scene.service';
import { BoxMeshService } from '../boxMesh.service';
import { CombinedMeshService } from '../combined-mesh-service';
import { ProductDetailsComponent } from '../product-details/product-details.component';
@NgModule({
  declarations: [
    NewProductComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NewProductComponent
  ],
  providers:[
    SceneService
  ,BoxMeshService,
CombinedMeshService,
ProductDetailsComponent

]
})
export class NewProductModule { }
