import { ElementRef, Injectable } from '@angular/core';
import { BoxMeshService } from '../boxMesh.service';
import { CombinedMeshService } from '../combined-mesh-service';
import { SceneService } from '../my-scene/scene.service';

@Injectable({
  providedIn: 'root'
})
export class StackBoxService {
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private boxMesh!: THREE.Mesh;
  constructor(
    private sceneService: SceneService, 
    private boxmeshService: BoxMeshService,
    private combinedMeshService:CombinedMeshService,
  ) { }


moveBoxtoPass(xPos:number)
{
  const canvasRef: ElementRef | undefined = this.sceneService.getCanvasRef();
  if (canvasRef) {
    this.boxMesh = this.boxmeshService.boxMesh;
    this.scene = this.sceneService.getScene();

    // get Created renderer and camera
    this.renderer = this.sceneService.getRenderer();
    this.camera = this.sceneService.getCamera();
    this.animateStraight(xPos);
  }
}



private animateStraight(xPos: number) {
  if (this.boxMesh.position.x < xPos) {
    this.boxMesh.position.x += 0.03;
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.animateStraight(xPos));
  }
  else
  {

    this.combinedMeshService.getProductResults(true)
  }
  }

  moveBoxtoFail(zPos:number)

  {
    const canvasRef: ElementRef | undefined = this.sceneService.getCanvasRef();
  if (canvasRef) {
    this.boxMesh = this.boxmeshService.boxMesh;
    this.scene = this.sceneService.getScene();

    // get Created renderer and camera
    this.renderer = this.sceneService.getRenderer();
    this.camera = this.sceneService.getCamera();
    this.animateBoxRight(zPos)

  }

}

private animateBoxRight(zPos: number) {
  if (this.boxMesh.position.z < zPos) {
    this.boxMesh.position.z += 0.03;
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.animateStraight(zPos));
  }
  else
  {

    this.combinedMeshService.getProductResults(true)
  }
  }


}

