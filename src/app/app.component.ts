import { Component, ChangeDetectorRef } from '@angular/core';
import { getLocaleDateFormat, FormatWidth } from '@angular/common';

@Component({
  
  selector: 'app-root',
  templateUrl: './app.component.html'
  , styleUrls: ['./app.component.css']
    

})
export class AppComponent {
  title = 'quiz-editor';

  titleTextDanger = true;
  titleBackDanger = false;

}
