import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private builtInAgularHttpClient: HttpClient) { }

  ngOnInit() {
    this.quizzes = this.quizSVC.getQuizzes()
  }

  getQuizzes() {

    return this.builtInAgularHttpClient.get('https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Kevin%20Selm');

    // return [
    //   {name: "Quiz 1", numberOfQuestions: 6}
    //   , {name: "Quiz 2", numberOfQuestions: 0}
    //   , {name: "Quiz 3", numberOfQuestions: 10}
    // ]
  }

  getNumberOfQuizzes(succeed: boolean): Promise<number> {
    let p = new Promise<number>(
      (resolve, reject) => succeed ? resolve(42) : reject("Failed")
    )
    return p
  }
}