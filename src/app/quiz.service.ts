import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }


  /**
   * Get an array of quizzes via a REST service and return as JSON
   * @returns String - A JSON array 
   */
  public getQuizzes() {
    return [];
  }  


}


/*

getQuizzes() {
    return [ 
      { name: "Quiz 1", numberOfQuestions: 6 }
      , { name: "Quiz 2", numberOfQuestions: 0 }
      , { name: "Quiz 3", numberOfQuestions: 16 }
    ];
  }

{ name: "Quiz 1b", numberQuestions: 2, questions: [{ }] }

Endpoint: https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Mystery%20Quiz

*/