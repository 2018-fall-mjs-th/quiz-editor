import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz-editor';

  dumb = 'foo';

  titleColorDanger = this.dumb === 'foo':true;
  titleBackgroundColorDanger = false;

}
