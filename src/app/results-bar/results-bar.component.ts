import { Component, OnInit } from '@angular/core';
import { ProductVariableList } from '../inputGroup';
import { CombinedMeshService } from '../combined-mesh-service';

@Component({
  selector: 'app-results-bar',
  templateUrl: './results-bar.component.html',
  styleUrls: ['./results-bar.component.css']
})

export class ResultsBarComponent implements OnInit {
  boxMeshProperties: ProductVariableList = {
  };
  constructor(
    private combinedMeshService: CombinedMeshService
  ) 
  {}

   findResultofStage()
   {   
    this.boxMeshProperties = this.combinedMeshService.getProperties() || {};
    console.log("log in results component")
    console.log(this.boxMeshProperties);
   }


  ngOnInit(): void {}

}
