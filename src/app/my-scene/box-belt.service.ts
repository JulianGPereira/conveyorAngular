import { ElementRef, Injectable } from '@angular/core';
import { BoxMeshService } from './boxMesh.service';
import { SceneService } from './scene.service';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class BoxBeltService {
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private boxMesh!: THREE.Group;
  constructor(
    private sceneService: SceneService,
    private boxmeshService: BoxMeshService,
  ) { }


  async moveOnBelt() {
    const canvasRef: ElementRef | undefined = this.sceneService.getCanvasRef();
    if (canvasRef) {
      this.boxMesh = this.boxmeshService.getBox();
      this.scene = this.sceneService.getScene();

      // Get Created renderer and camera
      this.renderer = this.sceneService.getRenderer();
      this.camera = this.sceneService.getCamera();

      await this.animateToPosition(new THREE.Vector3(this.boxMesh.position.x, this.boxMesh.position.y, 1.9)); // For straight animation
      await this.animateToPosition(new THREE.Vector3(-8.4, this.boxMesh.position.y, this.boxMesh.position.z)); // For left animation
      await this.animateToPosition(new THREE.Vector3(this.boxMesh.position.x, this.boxMesh.position.y, -1)); // For straight animation


      this.scene.remove(this.boxMesh);
    }
  }

  private async animateToPosition(targetPosition: THREE.Vector3): Promise<void> {
    return new Promise<void>((resolve) => {
      const maxFrames = 50; // Limit the number of animation frames
      let frameCount = 0;
  
      const animate = () => {
        const distance = targetPosition.distanceTo(this.boxMesh.position);
        const speed = 0.06;
        const tolerance = 0.01; // Tolerance for reaching the target position
  
        if (distance > tolerance && frameCount < maxFrames) {
          const direction = targetPosition.clone().sub(this.boxMesh.position).normalize();
          this.boxMesh.position.add(direction.multiplyScalar(speed));
          this.renderer.render(this.scene, this.camera);
          requestAnimationFrame(animate);
          frameCount++;
        } else {
          this.boxMesh.position.copy(targetPosition);
          resolve();
        }
      };
  
      animate();
    });
  }
 
}
