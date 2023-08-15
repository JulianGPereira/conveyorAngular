import { Component, OnInit } from '@angular/core';
import { SceneService } from 'src/scene.service';
import { BoxMeshService } from '../boxMesh.service';
@Component({
  selector: '[app-new-product]',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
 scene=this.sceneService.getScene()
  constructor(private sceneService: SceneService,private boxmeshService:BoxMeshService) { }
  
  newProduct()
  {
    console.log("Button clicked")
    const boxMesh=this.boxmeshService.boxMesh
    boxMesh.position.set(-7.5,3.6,-1.45)
    this.scene.add(boxMesh)

  }
 

  ngOnInit(): void {
    
  }

}
