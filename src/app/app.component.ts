import { Component } from '@angular/core';
import { QuizService } from './quiz.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  quizzes: any = [];
  constructor (private quizSvc: QuizService) {
    // console.log(this.quizSvc.getQuizzes());
    this.quizSvc.getQuizzes().subscribe(
      data => this.quizzes = data
    );
  }

  title = 'quiz-editor';

  imageWidth: number = 100;

  increaseImageWidth = () => this.imageWidth *= 1.2;
}
