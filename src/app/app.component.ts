import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz-editor';

  dumb = "foo";
  headingTwoBackgroundColor = this.dumb === 'foo' ? 'Red' : 'Blue';


  imageWidth: number = 100;

  increaseImageWidth = () => this.imageWidth *= 1.5;

}

