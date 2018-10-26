import { Component } from '@angular/core';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (private quizSvc: QuizService) {
    console.log(this.quizSvc.getQuizzes());
  }

  title = 'quiz-editor';

  dumb: string = "foo123";

  titleColorDanger = this.dumb === 'foo' ? true : false;
  titleBackgroundColorDanger = true;

  headingTwoBackgroundColor = this.dumb === 'foo' ? 'Red': 'Blue';

  imageWidth: number = 100;
  increaseImageWidth = () => this.imageWidth *= 1.5;
}
