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
  dumb = 'foo';
  titleColorDanger = this.dumb === 'foo' ? true: false;
  titleBackgroundColorDanger = false;
  headingTwoBackgroundColor = this.dumb === 'foo' ? "lightcoral" : "lightblue";
  imageWidth = 200;

  private increaseImageWidth = () => this.imageWidth *= 1.5;

}
