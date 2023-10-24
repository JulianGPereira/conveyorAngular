import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable().pipe(delay(1));
private index!:number
private labelRenderer!:CSS2DRenderer
private newDiv = document.createElement('div');
  constructor() {}

  show() {
    this._loading.next(true);
  }

  hide() {
    this._loading.next(false);
  }

setRenderer(labelRenderer: CSS2DRenderer)
{
  console.log(labelRenderer)
  this.labelRenderer=labelRenderer

}
setIndex(index: number) {
  if (index === 1) {
    const container = document.getElementById('container');
    this.labelRenderer.setSize(container!.clientWidth,container!.clientHeight);
    if (container) {
      // Remove the element from its current parent (if any)
      const currentParent = this.labelRenderer.domElement.parentNode;
      if (currentParent) {
        currentParent.removeChild(this.labelRenderer.domElement);
      }
      // Append the element to the container
      container.appendChild(this.labelRenderer.domElement);
    }
  }
  console.log(this.labelRenderer)
  console.log(index);
}

  
}