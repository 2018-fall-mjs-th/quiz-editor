import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() {
    getQuizes () {
      return [
        { name: "Quiz 1", numberOfQuestions: 6 },
        { name: "Quiz 2", numberOfQuestions: 12},
        { name: "Quiz 3", numberOfQuestions: 2}
      ];
    }
  }
}
