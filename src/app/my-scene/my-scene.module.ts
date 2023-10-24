import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySceneComponent } from './my-scene.component';
import { SceneService } from 'src/app/my-scene/scene.service';
import { BoxMeshService } from './boxMesh.service';
import { RaycasterService } from './raycaster-service';
import { ModelLoaderService } from './model-loader.service';
import { DetailsPopupService } from './details-popup.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    MySceneComponent,
    
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports:[
    MySceneComponent
  ],
  providers:[
    SceneService,
    BoxMeshService,
    RaycasterService,
    ModelLoaderService,
    DetailsPopupService
  ]
})
export class MySceneModule { }
