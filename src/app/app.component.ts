import { Component } from '@angular/core';
import { QuizService } from './quiz.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  quizzes: any = []
  wasErrorLoadingQuizzes: boolean = false

  constructor (private quizSvc: QuizService) {
  }

  ngOnInit() {
    // console.log(this.quizSvc.getQuizzes());
    this.quizSvc.getQuizzes().subscribe(
      data => this.quizzes = data
      , error => this.wasErrorLoadingQuizzes = true
    ) 
  }

  learningPromises() {
    console.log("learningPromises()")

    let x = this.quizSvc.getNumberOfQuizzes(true)
    console.log(x)
    x.then(
      n => console.log(n)
    ).catch(
      e => console.log(e)
    )

    let y = this.quizSvc.getNumberOfQuizzes(false)
    console.log(y)

    y.then(
      n => console.log(n)
    ).catch(
      e => console.log(e)
  })

  async learningPromisesWithAsyncAwait() {
    console.log("aysncAwait")
    try {
      let x = await this.quizSvc.getNumberOfQuizzes(true)
      console.log(x)

      let y = await this.quizSvc.getNumberOfQuizzes(false)
      console.log(y)
    }
    
    catch (e) {
      console.log(e)
    }
    
  }

  title = 'quiz-editor'

  imageWidth: number = 100

  increaseImageWidth = () => this.imageWidth *= 1.2
}
