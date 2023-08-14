import * as THREE from "three";
import { Injectable} from '@angular/core';
@Injectable()
export class BoxMeshService
{
  

     geometry=new THREE.BoxGeometry(.5,.5,.5)
     material=new THREE.MeshStandardMaterial({color: 0x57554f})
     boxMesh=new THREE.Mesh(this.geometry,this.material)
}