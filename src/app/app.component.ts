import { Component } from '@angular/core';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private quizSvc: QuizService) {
    console.log(this.quizSvc.getQuizzes());
    this.quizzes = this.quizSvc.getQuizzes();
  }

  quizzes;
  title = 'quiz-editor';

}
