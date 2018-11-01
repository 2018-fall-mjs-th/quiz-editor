import { Component } from '@angular/core';
import { QuizService } from './quiz.service';
import { ConsoleReporter } from 'jasmine';

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
  }

  ngOnInit() {
    this.quizSvc.getQuizzes().subscribe(
      //data => console.log(data)
      data => this.quizzes = data
      //, error => console.log(error)
      , error => this.wasErrorLoadingQuizzes = true
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

  learningJsPromises() {
    console.log('learningJsPromises');

    let x = this.quizSvc.getNumberOfQuizzes(true);
    console.log(x);

    x.then(
      data => console.log(data)
    ).catch(
      error => console.log(error)
    );

    let y = this.quizSvc.getNumberOfQuizzes(false);
    console.log(y);
    
    y.then(
      data => console.log(data)
    ).catch(
      error => console.log(error)
    );  
  }

  async learningJsPromisesAsyncAwait() {
    try {
      let x = await this.quizSvc.getNumberOfQuizzes(true);
      console.log(x);

      let y = await this.quizSvc.getNumberOfQuizzes(false);
      console.log(y);
    }
    catch (error) {
      console.log(error);
    }
  }
}
