import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }

  ngOnInit() {
    this.quizzes = this.quizSVC.getQuizzes()
  }

  getQuizzes() {
    return [
      {name: "Quiz 1", numberOfQuestions: 6}
      , {name: "Quiz 2", numberOfQuestions: 0}
      , {name: "Quiz 3", numberOfQuestions: 10}
    ]
  }
}
