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
    //console.log(this.quizSvc.getQuizzes());
    //Moved this.quizzes to ngOnInit() 
  }

  ngOnInit() {
    this.quizSvc.getQuizzes().subscribe(
      data => this.quizzes = data       // <--the more modern way of writing it
      , error => this.wasErrorLoadingQuizzes = true
      //(data) => {
      //  console.log(data);
      //  this.quizzes = data
        
        
      //}
    );
  }

  learningPromises() {
    console.log("working");

    let x = this.quizSvc.getNumberOfQuizzes(true);
    console.log(x);

    x.then(
      n => console.log(n)
    ).catch(
      e => console.log(e);

    let y = this.quizSvc.getNumberOfQuizzes(false);
    console.log(y);

    y.then(
      n => console.log(n)
    ).catch(
      e => console.log(e)
    );
  }

  async learningPromisesWithAsyncAway() {
   
    //console.log("learningPromisesWithAsyncAwait()");

    try {

    let x = await this.quizSvc.getNumberOfQuizzes(true);
    console.log(x);

    let y = await this.quizSvc.getNumberOfQuizzes(false);
    console.log(x);
    }
    catch(e) {
      console.log(e);
    }
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
