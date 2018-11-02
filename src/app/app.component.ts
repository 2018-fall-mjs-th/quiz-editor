import { Component } from '@angular/core';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  quizzes: any = [];

  wasErrorLoadingQuizzes: boolean = false;

  constructor(private quizSvc: QuizService) {
    // this.quizzes = this.quizSvc.getQuizzes();
  }

  ngOnInit() {
    // because getQuizzes returns an Observable, we have to subscribe to it
    this.quizSvc.getQuizzes().subscribe(
    
      // a shorter way
      data => this.quizzes = data
      , error => this.wasErrorLoadingQuizzes = true

      //   data => {
      //    console.log(data);
      //     this.quizzes = data;
      //   }
    );
  }

  title = 'quiz-editor';

  dumb = 'foo';

  titleColorDanger = this.dumb === 'foo' ? false : true;
  titleBackgroundColorDanger = true;

  headingTwoBgColor = this.dumb === 'foo' ? 'Red' : 'Blue';

  imageWidth: number = 100;

  increaseImageWidth = () => this.imageWidth *= 1.5;

}
