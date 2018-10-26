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

  titleColorDanger = true;
  titleBakcgroundDanger = false;

  imageWidth: number = 200;

  increaseWidth = () => this.imageWidth *= 1.1;
}
