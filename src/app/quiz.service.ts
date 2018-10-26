import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }

  getQuizzes() {
    return [
      
        {name: "Quiz1" , numberOfQuestions: 6}
        ,{name: "Quiz2" , numberOfQuestions: 0}
        ,{name: "Quiz3" , numberOfQuestions: 16}
    ]
  }
}
