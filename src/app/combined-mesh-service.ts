import { Injectable } from '@angular/core';
import { ProductVariableList } from './inputGroup';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CombinedMeshService {
  private combinedMeshProperties: ProductVariableList | undefined;
  private product$ = new BehaviorSubject<any>({});
  private results$=new BehaviorSubject<any>({});
  private move$=new BehaviorSubject<any>({});
  private pass$=new BehaviorSubject<any>({});

  incrementedProduct$ = this.product$.asObservable();
  getProductResult$=this.results$.asObservable()
  setBoxMoveStraight$=this.move$.asObservable();
  moveBoxtoPass$=this.pass$.asObservable();



  constructor() {}

  updateProperties(boxMesh: THREE.Mesh, selectedProduct: ProductVariableList) {
    this.combinedMeshProperties = {
      ...(boxMesh as object),
      ...selectedProduct
    };
  }

  getProperties(): ProductVariableList | undefined {
    return this.combinedMeshProperties;
  }

  setProductIncrement(value:number) {
    
    this.product$.next(value);
  }

  getProductResults(status: boolean)
  {
    this.results$.next(status)
  }

  setBoxMoveStraight(xPos:number)
  {
    this.move$.next(xPos)
  }

  moveBoxtoPass(xPos:number)
  {
    // console.log("i am called")
    this.pass$.next(xPos)
  }
}
