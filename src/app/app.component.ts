import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz-editor';

  titleColorDanger = true;
  titleBakcgroundDanger = false;

  imageWidth: number = 200;

  increaseWidth = () => this.imageWidth *= 1.1;
}
