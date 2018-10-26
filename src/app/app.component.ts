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

  imageWidth: number = 100;

  increaseImageWidth = () => this.imageWidth *= 1.2;
}
