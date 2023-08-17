import * as THREE from "three";
import { Injectable} from '@angular/core';
import { MeshStandardMaterial } from "three";
@Injectable()
export class BoxMeshService
{

geometry!:THREE.BoxGeometry
material!:MeshStandardMaterial
boxMesh!:THREE.Mesh
  
createBox()
{
     this.geometry=new THREE.BoxGeometry(.5,.5,.5)
     this.material=new THREE.MeshStandardMaterial({color: 0x57554f})
     this.boxMesh=new THREE.Mesh(this.geometry,this.material)
     return this.boxMesh
}

getBox()
{
     return this.boxMesh
}
     
}