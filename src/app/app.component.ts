import { Component } from '@angular/core';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  quizzes = [];

  constructor (private quizSvc: QuizService) {
      //console.log(this.quizSvc.getQuizzes());
      this.quizzes = this.quizSvc.getQuizzes();
  }

  title = 'quiz-editor';

  dumb = "foo";

  headingTwoBackgroundColor = this.dumb === 'foo' ? 'lightgray' : 'purple';

  titleColorDanger = true;

  titleBackgroundColorSuccess = this.dumb === 'foo' ? true : false;

  imageWidth = 200;

  increaseImageSize = () => this.imageWidth *= 1.5;
}
