import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { ForkLiftService } from './fork-lift.service';
import { ModelLoaderService } from './model-loader.service';
import { SceneService } from './scene.service';

@Injectable({
  providedIn: 'root'
})
export class LaneService {
private filledForklift!:THREE.Group
private scene!:THREE.Scene

  constructor(
    private forkLiftService:ForkLiftService,
    private modelLoaderService:ModelLoaderService,
    private sceneService:SceneService
  ) { 
    this.scene=this.sceneService.getScene()
    // this.filledForklift=this.modelLoaderService.getFilledForkLiftModel()

  }

  async setInLane(objectsInLane: THREE.Object3D<THREE.Event>[],forkLiftPos:THREE.Vector3,monotainerPos:THREE.Vector3)
  {
    this.filledForklift=this.modelLoaderService.getFilledForkLiftModel()
    this.filledForklift.position.copy(forkLiftPos)
    this.filledForklift.rotateY(Math.PI)
    this.scene.add(this.filledForklift)
    await this.forkLiftService.animateToPosition(new THREE.Vector3(this.filledForklift.position.x, this.filledForklift.position.y, 3))
    setTimeout(() => {
      this.scene.remove(this.filledForklift);
      this.filledForklift.rotateY(Math.PI)
      this.filledForklift.position.copy(this.forkLiftService.getStartPos())
    }, 1000);
    objectsInLane[0].position.copy(monotainerPos)
    this.scene.add(objectsInLane[0])
    console.log(objectsInLane[0])
    

  }
}
