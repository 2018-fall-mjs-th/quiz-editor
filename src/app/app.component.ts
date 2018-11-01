import { Component } from '@angular/core';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  quizzes: any = [];

  constructor (private quizSvc: QuizService) {
    //console.log(this.quizSvc.getQuizzes());
    //Moved this.quizzes to ngOnInit() 
  }

  ngOnInit() {
    this.quizSvc.getQuizzes().subscribe(
      //data => this.quizzes = data        <--the more modern way of writing it
      (data) => {
        console.log(data);
        this.quizzes = data;
      }
    );
  }

  title = 'quiz-editor';

  dumb: string = "foo123";

  titleColorDanger = this.dumb === 'foo' ? true : false;
  titleBackgroundColorDanger = false;

  headingTwoBackgroundColor = this.dumb === 'foo' ? 'Red' : 'Blue';

  imageWidth: number = 100;
  //imageWidth = '100px';

  increaseImageWidth = () => this.imageWidth *= 1.5;



}
