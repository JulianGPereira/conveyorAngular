import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckStageComponent } from './check-stage.component';
import { SceneService } from 'src/scene.service';
import { BoxMeshService } from '../boxMesh.service';



@NgModule({
  declarations: [
    CheckStageComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CheckStageComponent
  ],
  providers:[
    SceneService
  ,BoxMeshService
]
  
})
export class CheckStageModule { }
