import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }

  getQuizzes() {
    return [
      { name: "Quiz 1", numberofQuestions: 6}      
      , { name: "Quiz 2", numberofQuestions: 4}      
      , { name: "Quiz 3", numberofQuestions: 8}
    ];
  }
}
