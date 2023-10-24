import * as THREE from "three";
import { Injectable} from '@angular/core';
import { MeshStandardMaterial } from "three";
import { SceneService } from "./scene.service";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
@Injectable()
export class BoxMeshService
{
     constructor(private sceneService:SceneService)
     {}


boxMesh!:THREE.Mesh
model!:THREE.Group
  
createBox(): Promise<THREE.Group> {
     return new Promise((resolve) => {
     
       const loaderGLTF = new GLTFLoader();
 
       loaderGLTF.load('assets/product.glb', (glb: any) => {
         this.model  = glb.scene as THREE.Group;
        this. model.name = 'product';
 
         glb.scene.traverse(function (child: any) {
           if (child.isMesh) {
             child.castShadow = true;
             child.receiveShadow = true;
           }
         });
         resolve(this.model);
       });
     });
   }

getBox():THREE.Group
{
     return this.model
}
     
}