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

  dumb: string = "foo";
  titleColorDanger = this.dumb === 'foo' ? true:false;
  titleBackgroundColorDanger = false;

  headingToBackgroundColor = this.dumb === 'foo' ? 'Red' : 'Blue';

  imageWidth: number = 300;

   increaseImageWidth = () => { this.imageWidth *= 1.5};


}
