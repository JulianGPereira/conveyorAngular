import { Component, OnInit } from '@angular/core';
import { InputFetchService } from '../input-fetch.service';
import { ProductVariableList } from '../inputGroup';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productDataList:ProductVariableList[]=[]

  constructor(inputFetchService:InputFetchService) {
    inputFetchService.getInputDetails().then((productDataList:ProductVariableList[])=>{
      this.productDataList=productDataList
    })
   }

  ngOnInit(): void {
  }

}
