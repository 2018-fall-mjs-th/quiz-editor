import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private buildInAngularHttpClient: HttpClient) { }

  // returns an array of quiz objects
  getQuizzes() {
    
    return this.buildInAngularHttpClient.get('https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Mary%20Cummins');
  

    // not gonna hard code these anymore
    // return [
    //   { name: "Quiz 1", numberOfQuestions: 6 }
    //   , { name: "Quiz 2", numberOfQuestions: 0 }
    //   , { name: "Quiz 3", numberOfQuestions: 16 }
    // ];
  }

  getNumberofQuizzes(succeed: boolean): Promise<number> {

    // create promise
    let p = new Promise<number>(
      (resolve, reject) => succeed ? resolve(42) : reject("Failed!")
    );

    return p;
  }
}
