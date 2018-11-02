import { Component } from '@angular/core';
import { QuizService } from './quiz.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  quizzes: any = [];
  responseError: boolean = false;

  constructor (private quizSvc: QuizService) { }

  ngOnInit() {

    this.quizSvc.getQuizzes('Isaac').subscribe(data => {
      console.log(data);
      this.quizzes = data;
    }, err => {
      console.log('There was an error with the request');
      console.log(err);
      this.responseError = true;
    })

    this.quizSvc.getQuizzes('Isaac').subscribe(data => this.quizzes = data)
    
  }

  public myPromise() {
    console.log(this.quizSvc.getNumberOfQuizzes);
    let x = this.quizSvc.getNumberOfQuizzes(true);
    let y = this.quizSvc.getNumberOfQuizzes(false);
    console.log(x.then(num => console.log(num)));
    console.log(y.then(num => console.log(num)));

    
    x.then(data => {
      console.log(data);
    }).catch(err => {
      console.log(err);
    })

    y.then(
      data => console.log(data)
    ).catch(
      error => console.log(error)
    )

  }


  public async myAsyncAwait() {
    console.log("myAsyncAwait()");

    try {
      let x = await this.quizSvc.getNumberOfQuizzes(true);
      console.log(x);

      // Execution is paused until the above method completes

      let y = await this.quizSvc.getNumberOfQuizzes(false);
      console.log(y);

    } catch (e) {
      console.log(e);
    }

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


