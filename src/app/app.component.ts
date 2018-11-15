import { Component } from '@angular/core';
import { QuizService } from './quiz.service';
import {ViewEncapsulation} from '@angular/core';

interface quizDisplay {
  name: string;
  numberQuestions: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  quizzes: quizDisplay[] = [];
  quizLoadingError: boolean = false;

  constructor (private quizSvc: QuizService) {
  }

  ngOnInit() {
    this.quizSvc.getQuizzes().subscribe(
      data => this.quizzes = <quizDisplay[]> data
      , error => this.quizLoadingError = true
    );
  }

  learningPromises() {
    console.log("learningPromises()");

    let x = this.quizSvc.getNumberOfQuizzes(true);
    console.log(x);

    x.then(
      n => {
        console.log(n);

        let y = this.quizSvc.getNumberOfQuizzes(false);
        console.log(y);
    
        y.then(
          n => console.log(n)
        ).catch(
          e => console.log(e)
        );              
      }
      
    ).catch(
      e => console.log(e)
    );
  }

  async learningPromisesWithAsyncAwait() {
    console.log("learningPromisesWithAsyncAwait()");

    try {
      let x = await this.quizSvc.getNumberOfQuizzes(true);
      console.log(x);

      let y = await this.quizSvc.getNumberOfQuizzes(false);
      console.log(y);
    }

    catch (e) {
      console.log(e);
    }
  }

  async learningPromisesWithAwaitAll() {
    console.log("learningPromisesWithAsyncAwait()");

    try {
      let x = this.quizSvc.getNumberOfQuizzes(true);
      console.log(x);

      let y = this.quizSvc.getNumberOfQuizzes(true);
      console.log(y);

      let results = await Promise.all([x, y]);
      console.log(results);
    }

    catch (e) {
      console.log(e);
    }
  }

  selectedQuiz = undefined;
  selectQuiz(q) 
  {
    console.log(q);
    this.selectedQuiz = q;
  }

  addNewQuiz() {
    let q = { name: "New Quiz", numberQuestions: 0, questions: []};
    this.quizzes = [...this.quizzes, q];
    this.selectQuiz(q);
  }
  
  newQuestion = undefined;
  addNewQuestion() {
    this.selectedQuiz.questions = [...this.selectedQuiz.questions, {name: this.newQuestion}];
    this.updateQuizLength();
    this.newQuestion = "";
  }

  removeQuiz(deletion) {
    this.quizzes = this.quizzes.filter(x => x !== deletion);
    this.selectedQuiz = undefined;
  }

  removeQuestion(deletion) {
    this.selectedQuiz.questions = this.selectedQuiz.questions.filter(x => x !== deletion);
    this.updateQuizLength();
  }

  updateQuizLength() {
    this.selectedQuiz.numberQuestions = this.selectedQuiz.questions.length;
  }

  title = 'quiz-editor';

  dumb: string = "foo123";

  titleColorDanger = this.dumb === 'foo' ? true : false;
  titleBackgroundColorDanger = false;

  headingTwoBackgroundColor = this.dumb === 'foo' ? 'Red' : 'Blue';

  imageWidth: number = 100;

  increaseImageWidth = () => this.imageWidth *= 1.5;
}
