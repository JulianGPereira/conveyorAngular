import { Injectable, OnDestroy } from '@angular/core';
import { SceneService } from './scene.service';
import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


@Injectable({
  providedIn: 'root'
})
export class ModelLoaderService  {
  private loaderGLTF = new GLTFLoader();
  private filledForkLiftModelSortArea!:THREE.Group
  private filledForkLiftmodelLane!: THREE.Group;
  private filledForkLiftmodelExit!: THREE.Group;
  private ForkLiftmodel!: THREE.Group;
  private monotainer!: THREE.Group;
  private truck!:THREE.Group
  private mixer!:THREE.AnimationMixer
  private models: THREE.Object3D[] = [];
  private flag: boolean=false;
  private laneXPos:number=-2.4
  private laneBulb:Map<string, any>=new Map<string, any>();

  constructor(private sceneService: SceneService,
  ) {}

/**
 * Sets factory model
 * @param position 
 * @param scale 
 * @param rotation 
 * @returns factory model 
 */
setFactoryModel(
    position: THREE.Vector3,
    scale: THREE.Vector3,
    rotation: number
  ): Promise<void> {
    return new Promise((resolve)=>{
      const scene = this.sceneService.getScene();
      this.loaderGLTF.load('assets/Scene2.glb', (glb: GLTF) => {
      const model = glb.scene;
      this. mixer = new THREE.AnimationMixer(model);
      this.mixer.clipAction(glb.animations[5]).play();
      model.position.copy(position);
      model.scale.copy(scale);
      model.rotateY(rotation);
      model.name = 'factoryGround';
      glb.scene.traverse(function (child) {
        if ((<THREE.Mesh>child).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      scene.add(model);
      this.models.push(model);
      resolve();
    });

    })
  
  }

  /**
   * Sets model fork lift
   * @param position 
   * @param scale 
   * @param rotation 
   * @returns model fork lift 
   */
  setModelForkLift(
    position: THREE.Vector3,
    scale: THREE.Vector3,
    rotation: number
  ):Promise<void> {
    return new Promise((resolve)=>{
      const scene = this.sceneService.getScene();

      this.loaderGLTF.load('assets//filledForklift.glb', (glb: GLTF) => {
        this.filledForkLiftModelSortArea = glb.scene;
        this.filledForkLiftModelSortArea.position.copy(position);
        this.filledForkLiftModelSortArea.scale.copy(scale);
        this.filledForkLiftModelSortArea.rotateY(rotation);
        this.filledForkLiftModelSortArea.name = 'forklift';
        glb.scene.traverse(function (child) {
          if ((<THREE.Mesh>child).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        this.models.push( this.filledForkLiftModelSortArea);
        // this.scene.add(this.forkLiftmodel);
      });

      this.loaderGLTF.load('assets//filledForklift.glb', (glb: GLTF) => {
        this.filledForkLiftmodelLane = glb.scene;
        this.filledForkLiftmodelLane.position.copy(position);
        this.filledForkLiftmodelLane.scale.copy(scale);
        this.filledForkLiftmodelLane.rotateY(rotation);
        this.filledForkLiftmodelLane.name = 'forklift';
        glb.scene.traverse(function (child) {
          if ((<THREE.Mesh>child).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        this.models.push( this.filledForkLiftmodelLane);
        // this.scene.add(this.forkLiftmodel);
      });

      this.loaderGLTF.load('assets/forklift_ts.glb', (glb2: GLTF) => {
        this.ForkLiftmodel = glb2.scene;
        this.ForkLiftmodel.position.copy(position);
        this.ForkLiftmodel.scale.set(0.5, 0.5, 0.5);
        this.ForkLiftmodel.rotateY(rotation);
        this.ForkLiftmodel.name = 'forklift';
        glb2.scene.traverse(function (child) {
          if ((<THREE.Mesh>child).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
       scene.add(this.ForkLiftmodel);
       this.models.push(this.ForkLiftmodel);
      });
  
      this.loaderGLTF.load('assets/filledForklift.glb', (glb3: GLTF) => {
        this.filledForkLiftmodelExit = glb3.scene;
        this.filledForkLiftmodelExit.position.copy(position);
        this.filledForkLiftmodelExit.scale.copy(scale);
        this.filledForkLiftmodelExit.rotateY(rotation);
        this.filledForkLiftmodelExit.name = 'forklift';
        glb3.scene.traverse(function (child) {
          if ((<THREE.Mesh>child).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        // this.scene.add(this.forkLiftmodel);
        this.models.push( this.filledForkLiftmodelExit);
      

      });
      resolve();
    })
   
  }
/** */
/**
 * Sets monotainer Model on scene
 * @returns monotainer 
 */
setMonotainer(): Promise<void> {
    return new Promise((resolve) => {
     const scene = this.sceneService.getScene();
      this.loaderGLTF.load('assets/monotainer.glb', (glb: GLTF) => {
        this.monotainer = glb.scene;
        this.monotainer.scale.set(.09, .09, .09);
        glb.scene.traverse(function (child) {
          if ((<THREE.Mesh>child).isMesh) {
            child.castShadow = true; 
          }
        });
        this.monotainer.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material.emissive.setHex(0x5C4033);
          }
        });
        this.models.push( this.monotainer)
        resolve();
      });
    });
  }

/**
 * Sets truck model
 */
// setTruck(){
   
//     const scene = this.sceneService.getScene();
//       this.loaderGLTF.load('assets/truckGreen.glb', (glb: GLTF) => {
//         this.truck = glb.scene;
//         this.truck.position.set(12,2.6,3)
//         this.truck.scale.set(.7, .8, 1);
//         this.truck.rotateY(Math.PI)
//         glb.scene.traverse(function (child) {
//           if ((<THREE.Mesh>child).isMesh) {
//             child.castShadow = true;
//           }
//         });
//       scene.add(this.truck)
//       this.models.push( this.truck)
//     });
//   }

  /**
   * Sets cctv model
   */
  setCCTV(){
    const scene = this.sceneService.getScene();
      this.loaderGLTF.load('assets/CCTV.glb', (glb: GLTF) => {
        const CCTV = glb.scene;
       CCTV.position.set(1.9,1.2,7)
       CCTV.scale.set(.1,.1,.1);
       CCTV.rotateY(Math.PI)
        glb.scene.traverse(function (child) {
          if ((<THREE.Mesh>child).isMesh) {
            child.castShadow = true;
          }
        });
      scene.add(CCTV)
      this.models.push(CCTV)
    });
  }


/**
 * Sets lanes model based on api response
 */
setLanes() {
  const scene = this.sceneService.getScene();


      let delay = 0; // Initial delay in milliseconds
      let laneXPos = -.8; // Initial position for the first lane

      for (let i = 0; i < 4; i++) {
      // Ensure looping through planogram data
        this.loaderGLTF.load('assets/LaneNew.glb', (glb: GLTF) => {
          const lane = glb.scene;
          lane.position.set(laneXPos, 2.4, -1.5);
          lane.scale.set(0.13, 0.07, 0.11);
          lane.name ='Lane'

          const box1Geometry = new THREE.BoxGeometry(.2, .2, .15);
          const material = new THREE.MeshPhysicalMaterial({
            roughness: 0,
            transmission: 0.6, // Add transparency
          });
          const stage1Bulb = new THREE.Mesh(box1Geometry, material);
    
          stage1Bulb.position.set(laneXPos - 0.5, 4.3, 4.4);
          this.laneBulb.set(stage1Bulb.name, stage1Bulb);

          // Add the lane to the scene with a delay
          setTimeout(() => {
            scene.add(lane);
            scene.add(stage1Bulb);
            this.models.push(lane);
          }, delay);
          delay += 100;
          laneXPos += 1.6; // Increment the lane position
        });
      }
    
 
}

  
/**
 * Sets model load flag to check if all models are loaded completly
 * @param flag 
 */
setModelLoadFlag(flag: boolean)
{
  this.flag=flag
}


  getFilledForkLiftModel(): THREE.Group {
    return this.filledForkLiftModelSortArea;
  }
  getFilledForkLiftModelInLane():THREE.Group{
    return this.filledForkLiftmodelLane
  }

  getForkliftModel(): THREE.Group {
    return this.ForkLiftmodel;
  }

  getMonotainer(): THREE.Group {
    return this.monotainer;
  }

  getFilledForkLiftModelExit(): THREE.Group {
    return this.filledForkLiftmodelExit;
  }

  getTruck():THREE.Group{
    return this.truck
  }
 
  getMixer():THREE.AnimationMixer
  {
    return this.mixer
  }
  getModels():THREE.Object3D[] 
  {
    return this.models
  }
getModelLoadFlag():boolean
{
  return this.flag;
}
getLaneBulb():Map<string,any>
{
  return this.laneBulb
}
}

