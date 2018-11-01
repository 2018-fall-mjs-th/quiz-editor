import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private builtInAngularHttpClient: HttpClient) { }

  getQuizzes() {
    return [
      { name: "Quiz 1", numberOfQuestions: 6 }
      , { name: "Quiz 2", numberOfQuestions: 0 }
      , { name: "Quiz 3", numberOfQuestions: 16 }
    ];
  }
}
