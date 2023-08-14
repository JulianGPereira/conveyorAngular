import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProductComponent } from './new-product.component';
import { SceneService } from 'src/scene.service';



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
  providers:[SceneService]
})
export class NewProductModule { }
