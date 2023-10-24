import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProductComponent } from './new-product.component';
import { SceneService } from 'src/app/my-scene/scene.service';
import { BoxMeshService } from '../my-scene/boxMesh.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
@NgModule({
  declarations: [
    NewProductComponent
  ],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule
  ],
  exports:[
    NewProductComponent
  ],
  providers:[
    SceneService
  ,BoxMeshService,
]
})
export class NewProductModule { }
