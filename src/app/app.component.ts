import { Component } from '@angular/core';
import { QuizService } from './quiz.service';

interface quizDisplay {
  name: string;
  numberQuestions: number;
  questions: [];
}

interface questionDisplay {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  quizzes: quizDisplay[] = [];
  responseError: boolean = false;
  selectedQuiz = undefined;

  constructor (private quizSvc: QuizService) { }

  ngOnInit() {

    
    this.quizSvc.getQuizzes('Isaac').subscribe(data => {
      console.log(data);
      this.quizzes = <quizDisplay[]> data;
    }, err => {
      console.log('There was an error with the request');
      console.log(err);
      this.responseError = true;
    })
    
    //this.quizSvc.getQuizzes('Isaac').subscribe(data => this.quizzes = <quizDisplay[]> data);
    
    
  }

  public selectQuiz(q) {
    this.selectedQuiz = q;
  }

  public addNewQuiz() {
    let newQuiz = <quizDisplay> { name: '', numberQuestions: 0, questions: [] };
    this.quizzes = [...this.quizzes, newQuiz];
    this.selectedQuiz = newQuiz;
  }

  public addNewQuestion() {
    let newQuestion = <questionDisplay> { name: "New Question" };
    this.selectedQuiz.questions = [...this.selectedQuiz.questions, newQuestion];
  }

  public deleteQuestion(questionToRemove) {
    this.selectedQuiz.questions = this.selectedQuiz.questions.filter(aQuestion => {
      return questionToRemove != aQuestion;
    });
  }

  public myPromise() {
    console.log(this.quizSvc.getNumberOfQuizzes);
    let x = this.quizSvc.getNumberOfQuizzes(true);
    let y = this.quizSvc.getNumberOfQuizzes(false);
    console.log(x.then(num => console.log(num)));
    console.log(y.then(num => console.log(num)));

    
    x.then(data => {
      console.log(data);
    }).catch(err => {
      console.log(err);
    })

    y.then(
      data => console.log(data)
    ).catch(
      error => console.log(error)
    )

  }


  public async myAsyncAwait() {
    console.log("myAsyncAwait()");

    try {
      let x = await this.quizSvc.getNumberOfQuizzes(false);
      console.log(x);

      // Execution is paused until the above method completes
      let y = await this.quizSvc.getNumberOfQuizzes(true);
      console.log(y);

    } catch (e) {
      console.log(e);
    }

  }

  public async myAsyncAwaitAll() {
    console.log("myAsyncAwaitAll()");

    try {
      let x = this.quizSvc.getNumberOfQuizzes(true);
      let y = this.quizSvc.getNumberOfQuizzes(false);
    
      let results = await Promise.all([x, y]); // Promise.race (first result) Promise.
      console.log(results);

    } catch (e) {
      console.log(e);
    }

  }


  title = 'quiz-editor';
  dumb = 'foo';
  dangerTime = true;
  aDynamicClass = 'grey-text';
  lightgrey = 'lightgrey';
  imageWidth = 300;
  //titleColorDanger = this.dumb === 'foo' ? true : false;


  increaseImageWidth = () => this.imageWidth *= 1.5
  
  


}


