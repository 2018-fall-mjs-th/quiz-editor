import { Component, ChangeDetectorRef } from '@angular/core';
import { getLocaleDateFormat, FormatWidth } from '@angular/common';
import { QuizService } from './quiz.service';

@Component({
  
  selector: 'app-root',
  templateUrl: './app.component.html'
  , styleUrls: ['./app.component.css']
    

})
export class AppComponent {

  quizzes = [];
  constructor(private quizSvc: QuizService) { 
    //console.log(this.quizSvc.getQuizzes());
    this.quizzes = this.quizSvc.getQuizzes();
  }





  title = 'quiz-editor';

  titleTextDanger = true;
  titleBackDanger = false;

}
