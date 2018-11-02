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
  public getQuizzes(name: string) {
    return this.http.get(`https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=${name}`);
  }  

  public getNumberOfQuizzes(succeed: boolean): Promise<number> {
    let p = new Promise<number>(
      (resolve, reject) => succeed ? resolve(42) : reject('Failed :(')
    );
    return p;
  }
}