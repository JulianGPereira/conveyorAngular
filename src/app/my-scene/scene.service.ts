import { ElementRef, Injectable } from '@angular/core';
import * as THREE from 'three';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';

@Injectable()
export class SceneService {
  private canvasRef: ElementRef | undefined;
  private scene: THREE.Scene = new THREE.Scene(); // Initialize the scene
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;

  setCanvasRef(canvasRef: ElementRef) {
    this.canvasRef = canvasRef;
  }

  getCanvasRef(): ElementRef | undefined {
    return this.canvasRef;
  }

  getScene(): THREE.Scene {
    return this.scene;
  }

  setRenderer(render:THREE.WebGLRenderer) {
   this.renderer=render
  }

  createCamera(canvas: HTMLCanvasElement): THREE.PerspectiveCamera {
    const aspectRatio = canvas.width / canvas.height;
    this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 1, 1000);
    return this.camera;
  }

  getCamera(): THREE.PerspectiveCamera {
    return this.camera;
  }

  getCanvasWidth(canvas: HTMLCanvasElement): number {
    return canvas.clientWidth;
  }

  getCanvasHeight(canvas: HTMLCanvasElement): number {
    return canvas.clientHeight;
  }

  constructor() {}
  getRenderer(): THREE.WebGLRenderer {
    return this.renderer;
  }

  createLabelRenderer(canvas: HTMLCanvasElement) {
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(canvas.width, canvas.height);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    document.body.appendChild(labelRenderer.domElement);
    return labelRenderer;
  }
}
