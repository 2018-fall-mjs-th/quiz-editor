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
    this.quizzes = this.quizSvc.getQuizzes();
  }

  

  title = 'quiz-editor';
  dumb = 'foo';
  dangerTime = true;
  aDynamicClass = 'grey-text';
  lightgrey = 'lightgrey';
  imageWidth = 300;
  //titleColorDanger = this.dumb === 'foo' ? true : false;


  increaseImageWidth = () => this.imageWidth *= 1.5
  
  


}


