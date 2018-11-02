import { Component } from '@angular/core';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  quizzes:any = [];
  wasErrorLoadingQuizzes: boolean = false;

  constructor (private quizSvc: QuizService) {

  }

   ngOnInit() {
         //console.log(this.quizSvc.getQuizzes());
        this.quizSvc.getQuizzes().subscribe(
        // data => {
        //   console.log(data)
        //   this.quizzes = data});
        data => this.quizzes = data
        , error => this.wasErrorLoadingQuizzes = true
      );
   }

   learningPromises() {
     //console.log("Learning Promises");

     let x = this.quizSvc.getNumberOfQuizzes(true);
     console.log(x);

     x.then(
       n => console.log(n)
     ).catch(
       e => console.log(e)
     );

     let y = this.quizSvc.getNumberOfQuizzes(false);
     console.log(y);

     y.then(
       n => console.log(n)
     ).catch(
       e=> console.log(e)
     );

   }

  async learningPromisesWithAsynchAwait() {
    console.log("In Asych methods");

    let x = await this.quizSvc.getNumberOfQuizzes(true);
    console.log(x + "in await learn");
    try {
      let y = await this.quizSvc.getNumberOfQuizzes(false);
      console.log(y + "in await learn");
  
    } catch (e) {
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
