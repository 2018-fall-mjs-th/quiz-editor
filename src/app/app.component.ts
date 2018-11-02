import { Component, ChangeDetectorRef } from '@angular/core';
import { getLocaleDateFormat, FormatWidth } from '@angular/common';
import { QuizService } from './quiz.service';

@Component({
  
  selector: 'app-root',
  templateUrl: './app.component.html'
  , styleUrls: ['./app.component.css']
    

})
export class AppComponent {

  quizzes = [];
  wasErrorLoadingQuizzes: boolean = false;
  constructor(private quizSvc: QuizService) {
  }

  ngOnInit() {
      //console.log(this.quizSvc.getQuizzes());
      this.quizSvc.getQuizzes().subscribe(
        data => {
          this.quizzes = data;
          console.log(data);
          error => this.wasErrorLoadingQuizzes = true;
        }
      );
  }

  learningPromises() {
    let x = this.quizSvc.getNumberOfQuizzes(true);
    console.log(x);
    x.then(
      data => console.log(data);

      let y = this.quizSvc.getNumberOfQuizzes(false);
      console.log(y);
      y.then(
        data => console.log(data)
      ).catch(
        e => console.log(e)
      );

    );

  //   let y = this.quizSvc.getNumberOfQuizzes(false);
  //   console.log(y);
  //   y.then(
  //     data => console.log(data);
  //   ).catch(
  //     e => console.log(e)
  //   );
  }

  async learningPromisesAsyncAwait(){
    console.log("Await");

    try {
      let x = await this.quizSvc.getNumberOfQuizzes(true);
      console.log("waitingL " + x);

      let y = await this.quizSvc.getNumberOfQuizzes(false);
      console.log("waitingL " + y);
    }

    catch (e) {
      console.log(e);
    }
  }

  title = 'quiz-editor';

  titleTextDanger = true;
  titleBackDanger = false;

}
