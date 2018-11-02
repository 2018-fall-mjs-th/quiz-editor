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
  learningPromises() {
    console.log("learning promises");
    let x = this.quizSvc.getNumberOfQuizzes(true);
    console.log(x);

    x.then(
      data => console.log(data)
    ).catch(
      e => console.log(e)
    );

    let y = this.quizSvc.getNumberOfQuizzes(false);
    console.log(y);

    y.then(
      data => console.log(data)
    ).catch(
      e => console.log(e)
    );
  }

  async learningPromisesWithAsyncAwait() {
    console.log("in learningPromisesWithAsyncAwait");
    try {
      let x = await this.quizSvc.getNumberOfQuizzes(true);
      console.log(x);

      let y = await this.quizSvc.getNumberOfQuizzes(false);
      console.log(y);
    }
    catch (e) {
      console.log("failed with exception: " + e);
    }
    
  }

  ngOnInit() {
    //console.log(this.quizSvc.getQuizzes());
    this.quizSvc.getQuizzes().subscribe(
      data => this.quizzes = data
      , error => this.wasErrorLoadingQuizzes = true
      // (data) => {
      //   console.log(data);
      //   this.quizzes = data;
      // }
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
