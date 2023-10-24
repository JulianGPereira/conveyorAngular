import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { LoaderService } from './my-scene/loader.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles:['.mat-tab-group {margin-bottom: 48px;}'],
})
export class AppComponent {

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
   this.loaderService.setIndex(tabChangeEvent.index)
  }

  constructor(private loaderService:LoaderService)
  {
  }
}
