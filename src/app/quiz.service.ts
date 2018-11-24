import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private builtInAngularHttpClient: HttpClient) { }

  getQuizzes() {

    return this.builtInAngularHttpClient.get('https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Mystery%20Quiz');

    // https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Mystery%20Quiz

    // return [
    //   { name: "Quiz 1", numberOfQuestions: 6 }
    //   , { name: "Quiz 2", numberOfQuestions: 0 }
    //   , { name: "Quiz 3", numberOfQuestions: 16 }
    // ];
  }

  getNumberOfQuizzes(succeed: boolean): Promise<number> {

    let p = new Promise<number>(
      (resolve, reject) => succeed ? resolve(42) : reject("Failed!")
    );

    return p;
  }

  saveQuizzes() {

    //let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    // let headers = new Headers()
    //   .set("X-Sas-Token", "sig=WLBiqg_HC_FaEVqTUL4EeujDBQRQT9oL3R5uo1kIB1g")
    //   ;

    // headers.set('Content-Type', 'application/json')

    let h = new HttpHeaders({
      'Content-Type': 'application/json'
      , 'X-Sas-Token': 'sig=WLBiqg_HC_FaEVqTUL4EeujDBQRQT9oL3R5uo1kIB1g'
    });
    
    //h.append('Content-Type', 'application/json');
    //h.append('X-Sas-Token', 'sig=WLBiqg_HC_FaEVqTUL4EeujDBQRQT9oL3R5uo1kIB1g');
    console.log(h);

    this.builtInAngularHttpClient.post(
      'https://modern-js.azurewebsites.net/add-quizzes-proxy'
      , JSON.stringify(
        {
          "newQuizzes": [{ 
              "quizName": "Foo"
              , "quizQuestions": [
                  "qOne"
                  , "qTwo"
              ]
          }
          , {
              "quizName": "Bar"
              , "quizQuestions": [
                  "cat"
                  , "dog"
              ]
          }]
        }
      )
    , {
      headers: h
    }
    ).subscribe();
  }
}
