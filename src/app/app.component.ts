import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz-editor';

  dumb = "foo";

  headingTwoBackgroundColor = this.dumb === 'foo' ? 'lightgray' : 'purple';

  titleColorDanger = true;

  titleBackgroundColorSuccess = this.dumb === 'foo' ? true : false;

  imageWidth = 200;

  increaseImageSize = () => this.imageWidth *= 1.5;
}
