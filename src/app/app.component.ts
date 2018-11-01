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
  }

  ngOnInit() {
    this.quizSvc.getQuizzes().subscribe(
      // (data) => {
      //   console.log(data);
      //   this.quizzes = data;
      // }
      data => this.quizzes = data
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
