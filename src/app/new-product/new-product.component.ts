import { Component, OnInit } from '@angular/core';
import { SceneService } from 'src/scene.service';
import  * as THREE from "three";
@Component({
  selector: '[app-new-product]',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
 
  constructor(private sceneService: SceneService) { }
  
  newProduct()
  {
    console.log("Button clicked")
    // const scene=this.sceneService.scene
    // const geometry=new THREE.BoxGeometry(.5,.5,.5)
    // const material=new THREE.MeshStandardMaterial({color: 0x57554f})
    // const boxMesh=new THREE.Mesh(geometry,material)
    // boxMesh.position.set(-7.5,3.6,-1.45)
    // scene.add(boxMesh)

  }
  testing()
  {
    console.log("testing")
  }

  ngOnInit(): void {
    
  }

}
