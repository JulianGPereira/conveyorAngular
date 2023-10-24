import { Injectable } from '@angular/core';
import { ModelLoaderService } from './model-loader.service';
import { SceneService } from './scene.service';
import { MonotainerDetails } from '../inputGroup';

@Injectable({
  providedIn: 'root'
})
export class MonotainerService {
private monotainer!:THREE.Group
zPos=-2.5
xPos=-10
  constructor(
    private modelLoaderService:ModelLoaderService,
    private sceneService :SceneService,
    
  ) {}

  async stackMonotainer(monotainerDetails:MonotainerDetails)
  {
   await this.modelLoaderService.setMonotainer();
    const scene=this.sceneService.getScene()
    this. monotainer=this.modelLoaderService.getMonotainer()
    if(this.zPos>-6.5)
    {
      this. monotainer.position.set(this.xPos,3,this.zPos--)
    }else{
      this.zPos=-2.5
      this.xPos=-6
      this. monotainer.position.set(this.xPos,3,this.zPos--)

    }
    
    this.monotainer.name=monotainerDetails.id
     scene.add(this.monotainer)
  }



}
