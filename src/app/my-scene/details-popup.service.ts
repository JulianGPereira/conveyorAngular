import { Injectable } from '@angular/core';
import { Object3D, Event } from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { StageResults } from '../inputGroup';

@Injectable({
  providedIn: 'root'
})
export class DetailsPopupService {
// mesh!:any
  constructor(
  ) {
   
   }
 productLabel:any
 private stageRes?:StageResults
private mesh:Object3D | undefined
num=1
appendAlert(mesh: Object3D)
  {
    this.mesh=mesh
    this.stageRes
    const wrapper=document.createElement('div')
   
    wrapper.innerHTML = [
    
      `<table class="table">
            <tbody>
              <tr style ="font-size:10px">
                <td>${mesh.name}</td>
              </tr>
            </tbody>
          </table>
    </div>`
    ].join('')
    wrapper.className = "label";
    wrapper.style.marginTop = "-1em";
    this. productLabel = new CSS2DObject(wrapper);
    this.productLabel.position.set(0,1,this.num)
    this.productLabel.name='label'
    mesh.add(this.productLabel)
    console.log(this.productLabel)

  }

  removeAlert()
  {
   if(this.mesh!=undefined)
   {
    this.mesh.traverse(function (child) {
      if(child.name==='label')
      {
        child.removeFromParent()
      }
  });
   }
  }
}
