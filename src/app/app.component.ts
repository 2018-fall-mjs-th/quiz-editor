import { Component } from '@angular/core';
import {QuizServiceService } from './quiz-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private quizSvc: QuizServiceService) {
    console.log(this.quizSvc.getQuizzes());
  }
  title = 'quiz-editor';

  dumb = "foo123";

  titleColorDanger = this.dumb === 'foo' ? true : false;
  titleBackgroundColor = false;

  headingtwoBackgroundColor = this.dumb === 'foo' ? 'Red' : 'Blue';

  imageWidth: number = 300; 

 increaseImageWidth = () => {this.imageWidth *=1.5};
}
