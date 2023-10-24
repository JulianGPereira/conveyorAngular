import { ElementRef, Injectable } from '@angular/core';
import { SceneService } from './scene.service';
import { ModelLoaderService } from './model-loader.service';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class ForkLiftService {
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private forkLiftModel!:THREE.Group
  private model!:THREE.Group
  private startPos!:THREE.Vector3
  private forkLiftExit!:THREE.Group
  constructor(
     private sceneService: SceneService,
     private modelLoaderService:ModelLoaderService
  ) { 
    this. forkLiftModel=this.modelLoaderService.getFilledForkLiftModel()
    this. forkLiftExit=this.modelLoaderService.getFilledForkLiftModelExit()
  }

  async animateForkLift() {
    const canvasRef: ElementRef | undefined = this.sceneService.getCanvasRef();
    if (canvasRef) {
    this. forkLiftModel=this.modelLoaderService.getFilledForkLiftModel()
    this.model=this.modelLoaderService.getForkliftModel()
      this.scene = this.sceneService.getScene();

      // Get Created renderer and camera
      this.renderer = this.sceneService.getRenderer();
      this.camera = this.sceneService.getCamera();

      // Animate straight and then left sequentially using async/await
      this.scene.remove(this.model)
      this.startPos=this.model.position
      await this.animateToPosition(new THREE.Vector3(this.forkLiftModel.position.x, this.forkLiftModel.position.y, -1)); // For straight animation
      this.forkLiftModel.rotateY(Math.PI/2)
      await this.animateToPosition(new THREE.Vector3(-4, this.forkLiftModel.position.y, this.forkLiftModel.position.z)); // For left animation
      this.forkLiftModel.rotateY(Math.PI/2)
      await this.animateToPosition(new THREE.Vector3(this.forkLiftModel.position.x, this.forkLiftModel.position.y, -8)); // For straight animation
      this.scene.remove(this.forkLiftModel)
      this.forkLiftModel.rotateY(Math.PI)
      this.forkLiftModel.position.copy(this.startPos)
      this.scene.add(this.model)
    }
  }

   async animateToPosition(targetPosition: THREE.Vector3): Promise<void> {
    return new Promise<void>((resolve) => {
      const maxFrames = 120; // Limit the number of animation frames
      let frameCount = 0;
      this. forkLiftExit=this.modelLoaderService.getFilledForkLiftModelExit()
      const animate = () => {
        const distance = targetPosition.distanceTo(this.forkLiftModel.position);
        const speed = 0.09;
        const tolerance = 0.1; // Tolerance for reaching the target position
  
        if (distance > tolerance && frameCount < maxFrames) {
          const direction = targetPosition.clone().sub(this.forkLiftModel.position).normalize();
          this.forkLiftModel.position.add(direction.multiplyScalar(speed));
          this.renderer.render(this.scene, this.camera);
          requestAnimationFrame(animate);
          frameCount++;
        } else {
          this.forkLiftModel.position.copy(targetPosition);
          resolve();
        }
      };
  
      animate();
    });
  }

  async animateToPositionExit(targetPosition: THREE.Vector3): Promise<void> {
    return new Promise<void>((resolve) => {
      const maxFrames = 120; // Limit the number of animation frames
      let frameCount = 0;
  
      const animate = () => {
        const distance = targetPosition.distanceTo(this.forkLiftExit.position);
        const speed = 0.06;
        const tolerance = 0.1; // Tolerance for reaching the target position
  
        if (distance > tolerance && frameCount < maxFrames) {
          const direction = targetPosition.clone().sub(this.forkLiftExit.position).normalize();
          this.forkLiftExit.position.add(direction.multiplyScalar(speed));
          this.renderer.render(this.scene, this.camera);
          requestAnimationFrame(animate);
          frameCount++;
        } else {
          this.forkLiftExit.position.copy(targetPosition);
          resolve();
        }
      };
  
      animate();
    });
  }

  getStartPos():THREE.Vector3
  {
    return this.startPos

  }
}
