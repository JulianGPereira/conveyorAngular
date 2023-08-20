import { Injectable } from '@angular/core';
import { ProductVariableList } from './inputGroup';
import { StageValue } from './inputGroup';
@Injectable({
  providedIn: 'root'
})
export class InputFetchService {

  private stageValueRef?:StageValue

  constructor() { }

  url = 'http://localhost:3000/products';

  async getInputDetails(): Promise<ProductVariableList[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  setStageValue(stageValues:StageValue)
  {

     this.stageValueRef=stageValues

  }

  getStageValue()
  {
    return this.stageValueRef
  }

  

 
  





}
