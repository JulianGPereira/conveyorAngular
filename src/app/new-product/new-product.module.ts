import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProductComponent } from './new-product.component';
import { SceneService } from 'src/scene.service';
import { BoxMeshService } from '../boxMesh.service';
import { ProductIncrementService } from '../product-increment.service';
import { CombinedMeshService } from '../combined-mesh-service';

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
  ProductIncrementService,
CombinedMeshService

]
})
export class NewProductModule { }
