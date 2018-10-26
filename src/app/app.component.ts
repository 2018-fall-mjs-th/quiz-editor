import { Component } from '@angular/core';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   *This is the constructor for the AppComponent Class
   *We will inject a dependency.
   */
  constructor(private quizSvc: QuizService) {
        console.log(this.quizSvc.getQuizzes());
  }
  title = 'quiz-editor';

  dumb: string = "foo";

  titleColorDanger = this.dumb === 'foo' ? true : false;
  titleBackgroundColorDanger = false;

  headingTwoBackgroundColor = this.dumb === 'foo' ? 'Red' : 'Blue';

  imageWidth: number = 100;
  //imageWidth = '100px';
  quizzes = this.quizSvc.getQuizzes();

  increaseImageWidth = () => this.imageWidth *= 1.5;

}
