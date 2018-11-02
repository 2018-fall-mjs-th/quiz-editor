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

  learningPromises() {
    let x = this.quizSvc.getNumberOfQuizzes(true);
    console.log(x);

    x.then(
      data => {
        console.log(data);
        let y = this.quizSvc.getNumberOfQuizzes(false);
        console.log(y);

        y.then(
          data => console.log(data)
          ).catch(
          error => console.log(error)
        );
      }
    );

    
  }

  async learningPromisesWithAsyncAwait() {
    console.log("in learningPromisesWithAsyncAwait method");

    try {
      let x = await this.quizSvc.getNumberOfQuizzes(true);
      console.log(x);

      let y = await this.quizSvc.getNumberOfQuizzes(false);
      console.log(y);
    }

    catch (e) {
      console.log(e)
    }

  }

  async learningPromisesWithAwaitAll() {
    console.log("in learningPromisesWithAwaitAll method");

    try {
      let x = this.quizSvc.getNumberOfQuizzes(true);
      console.log(x);

      let y = this.quizSvc.getNumberOfQuizzes(false);
      console.log(y);

      let results = await Promise.all([x,y]);
      console.log(results);
    }

    catch (e) {
      console.log(e)
    }

  }

  title = 'quiz-editor';

  dumb = "foo";

  headingTwoBackgroundColor = this.dumb === 'foo' ? 'lightgray' : 'purple';

  titleColorDanger = true;

  titleBackgroundColorSuccess = this.dumb === 'foo' ? true : false;

  imageWidth = 200;

  increaseImageSize = () => this.imageWidth *= 1.5;
}
