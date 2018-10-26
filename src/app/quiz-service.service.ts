import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {

  constructor() {

   }
   getQuizzes() {
    return [
      {name:"quiz 1" , numberOfQuestions: 6}
      , {name:"quiz 2", numberOfQuestions: 0}
      , {name:"quiz 3",  numberOfQuestions: 16}

    ];

}
}
