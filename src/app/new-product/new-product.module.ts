import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProductComponent } from './new-product.component';
import { SceneService } from 'src/scene.service';
import { BoxMeshService } from '../boxMesh.service';



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
  ,BoxMeshService
]
})
export class NewProductModule { }
