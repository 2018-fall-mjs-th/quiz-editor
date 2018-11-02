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

  constructor (private quizSvc: QuizService) {
     
  }

  ngOnInit() {
    this.quizSvc.getQuizzes().subscribe(
      data => this.quizzes = data
      , error => this.wasErrorLoadingQuizzes = true
    );
  }

  title = 'quiz-editor';

  dumb = "foo";

  headingTwoBackgroundColor = this.dumb === 'foo' ? 'lightgray' : 'purple';

  titleColorDanger = true;

  titleBackgroundColorSuccess = this.dumb === 'foo' ? true : false;

  imageWidth = 200;

  increaseImageSize = () => this.imageWidth *= 1.5;
}
