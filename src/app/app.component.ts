import { Component } from '@angular/core';
import { QuizService } from './quiz.service';
import { ViewEncapsulation } from '@angular/core';


interface quizDisplay {
  name: string;
  originalName: string;
  numberQuestions: number;
  questions: any;
}

@Component({
  selector: 'app-root'
  , templateUrl: './app.component.html'
  , styleUrls: ['./app.component.css']
  , encapsulation: ViewEncapsulation.None
})

export class AppComponent {
  // ********************************************* Header Information and initializers variables
  title = 'quiz-editor';
  quizzes: quizDisplay[] = [];
  wasErrorLoadingQuizzes: boolean = false;
  selectedQuiz = undefined;
  constructor (private quizSvc: QuizService) {}

  ngOnInit() {
    this.quizSvc.getQuizzes().subscribe(
      data => this.quizzes = (<quizDisplay[]> data).map(x => ({
        ...x
        , originalName: x.name
      }))
      , error => this.wasErrorLoadingQuizzes = true
    );
  }



  
// *************************************************************************************************
// **                                     Process Quizzes                                         **
// *************************************************************************************************
  selectQuiz(q) {
    this.selectedQuiz = q;
  }

  addNewQuiz() {
    let q = { name: "New Untitled Quiz",originalName: "New Untitled Quiz", numberQuestions: 0, questions: []};
    this.quizzes = [...this.quizzes, q];
    this.selectQuiz(q);
  }

  addNewQuestion(selectedQuiz) {
    selectedQuiz.questions = [...selectedQuiz.questions, {"name": "New untitled question"}];
    selectedQuiz.numberQuestions = selectedQuiz.questions.length;
  }

  removeQuestion(selectedQuiz, selectedQuestion) {
    selectedQuiz.questions = selectedQuiz.questions.filter(n => n != selectedQuestion);
    selectedQuiz.numberQuestions = selectedQuiz.questions.length;
  }

  get numberOfChangedQuizzes() {
    let changedQuizzes = this.quizzes.filter(x => x.name !== x.originalName );
    return changedQuizzes.length;
  }








// *************************************************************************************************
// **                                      Practice Stuff                                         **
// *************************************************************************************************

  dumb: string = "foo123";

  titleColorDanger = this.dumb === 'foo' ? true : false;
  titleBackgroundColorDanger = false;

  headingTwoBackgroundColor = this.dumb === 'foo' ? 'Red' : 'Blue';

  imageWidth: number = 100;
  //imageWidth = '100px';


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

      //let results = await Promise.race([x, y]);
      let results = await Promise.all([x, y]);
      console.log(results);
    }

    catch (e) {
      console.log(e);
    }
  }
  increaseImageWidth = () => this.imageWidth *= 1.5;



}
