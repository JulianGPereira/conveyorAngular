import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsBarComponent } from './results-bar.component';
import { BoxMeshService } from '../boxMesh.service';
import { CombinedMeshService } from '../combined-mesh-service';
import { SceneService } from '../my-scene/scene.service';
import { StackBoxService } from './stack-box.service';

@NgModule({
  declarations: [
    ResultsBarComponent,
    
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ResultsBarComponent
  ],
  providers:
  [
    SceneService
    ,BoxMeshService,
  CombinedMeshService,
  StackBoxService

  ]
})
export class ResultsBarModule { }
