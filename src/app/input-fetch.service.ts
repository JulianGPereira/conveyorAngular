import { Injectable } from '@angular/core';
import { ProductVariableList } from './inputGroup';
@Injectable({
  providedIn: 'root'
})
export class InputFetchService {

  constructor() { }

  url = 'http://localhost:3000/products';

  async getInputDetails(): Promise<ProductVariableList[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

}
