import { Component } from '@angular/core';
import { QuizService } from './quiz.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  quizzes: any = [];

  constructor (private quizSvc: QuizService) { }

  ngOnInit() {
    this.quizSvc.getQuizzes('Isaac').subscribe(data => {
      console.log(data);
      this.quizzes = data;
    });
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


