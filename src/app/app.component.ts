import { Component } from '@angular/core';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  quizzes = [];
  /**
   *This is the constructor for the AppComponent Class
   *We will inject a dependency.
   */
  constructor(private quizSvc: QuizService) {
    this.quizzes = this.quizSvc.getQuizzes();
  }
  title = 'Quiz Editor';
  imageWidth: number = 100;

  increaseImageWidth = () => this.imageWidth *= 1.5;
}
