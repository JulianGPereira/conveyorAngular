import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductVariableList } from '../inputGroup';
import { CombinedMeshService } from '../combined-mesh-service';

@Component({
  selector: 'app-results-bar',
  templateUrl: './results-bar.component.html',
  styleUrls: ['./results-bar.component.css']
})

export class ResultsBarComponent implements OnInit {
  boxMeshProperties: ProductVariableList = {};
  @ViewChild ('stage1Res') private stage1:ElementRef<HTMLButtonElement> |undefined
  @ViewChild ('stage2Res') private stage2:ElementRef<HTMLButtonElement> |undefined
  @ViewChild ('stage3Res') private stage3:ElementRef<HTMLButtonElement> |undefined
  @ViewChild ('stage4Res') private stage4:ElementRef<HTMLButtonElement> |undefined
  constructor(
    private combinedMeshService: CombinedMeshService
  ) 
  {}

   findResultofStage()
   {   
    this.boxMeshProperties = this.combinedMeshService.getProperties() || {};
    console.log("log in results component")
    if(this.stage1)
    {
      if(Number(this.boxMeshProperties.temperature)<30)
      {
        this.stage1.nativeElement.value='Pass'
        console.log("here")
      }else{
        this.stage1.nativeElement.value='Fail'
      } 
    }
    if(this.stage2)
    {
     Number(this.boxMeshProperties.temperature)<30?this.stage2.nativeElement.value='Pass':this.stage2.nativeElement.value='Fail'

    }
    if(this.stage3)
    {
      Number(this.boxMeshProperties.temperature)<45?this.stage3.nativeElement.value='Pass':this.stage3.nativeElement.value='Fail'
     
    }
    if(this.stage4)
    {
      Number(this.boxMeshProperties.temperature)<21?this.stage4.nativeElement.value='Pass':this.stage4.nativeElement.value='Fail'

    }
   }


  ngOnInit(): void 
  {
    this.combinedMeshService. getProductResult$.subscribe(()=>{
      this.findResultofStage()
    })
  }

}
