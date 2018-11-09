import { Component } from '@angular/core';
import { QuizService } from './quiz.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
  // ...
} from '@angular/animations';

interface quizDisplay {
  name: string;
  numberQuestions: number;
  questions: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('detailsFromLeft', [
      transition('leftPosition => finalPosition', [
        animate('300ms',  keyframes([
          style({ left: '-30px', offset: 0.0 }),
          style({ left: '-20px', offset: 0.25 }),
          style({ left: '-10px', offset: 0.5 }),
          style({ left: '-5px', offset: 0.75 }),
          style({ left: '0px', offset: 1.0 })
        ]))
      ]),
    ]),
  ],
})
export class AppComponent {

  quizzes: quizDisplay[] = [];
  wasErrorLoadingQuizzes: boolean = false;

  constructor (private quizSvc: QuizService) {
  }

  ngOnInit() {
    //console.log(this.quizSvc.getQuizzes());
    this.quizSvc.getQuizzes().subscribe(
      // (data) => {
      //   console.log(data);
      //   this.quizzes = data
      // }
      data => this.quizzes = <quizDisplay[]> data
      , error => this.wasErrorLoadingQuizzes = true
    );
  }

  selectedQuiz = undefined;

  detailsFromLeftState = 'leftPosition';

  selectQuiz(q) {
    //console.log(q);
    //this.selectedQuiz = undefined;
    this.selectedQuiz = q;
    this.detailsFromLeftState = 'finalPosition';
    //setTimeout(x => this.detailsFromLeftState = 'leftPosition', 500);
  }

  addNewQuiz() {
    let q = { name: "New Untitled Quiz", numberQuestions: 0, questions: []};
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

  detailsFromLeftAnimationComplete() {
    this.detailsFromLeftState = 'leftPosition';
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

      //let results = await Promise.race([x, y]);
      let results = await Promise.all([x, y]);
      console.log(results);
    }

    catch (e) {
      console.log(e);
    }
  }

  title = 'quiz-editor';

  dumb: string = "foo123";

  titleColorDanger = this.dumb === 'foo' ? true : false;
  titleBackgroundColorDanger = false;

  headingTwoBackgroundColor = this.dumb === 'foo' ? 'Red' : 'Blue';

  imageWidth: number = 100;
  //imageWidth = '100px';

  increaseImageWidth = () => this.imageWidth *= 1.5;



}
