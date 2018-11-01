import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private localClient: HttpClient) { }

  getQuizzes() {

    return this.localClient.get("https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Mystery%20Quiz");

    // https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Mystery%20Quiz

    // return [
    //   { name: "Quiz 1", numberOfQuestions: 6 }
    //   , { name: "Quiz 2", numberOfQuestions: 0 }
    //   , { name: "Quiz 3", numberOfQuestions: 16 }
    // ];
  }
}
