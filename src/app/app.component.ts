import { Component } from '@angular/core';
import { QuizService } from './quiz.service';
import {ViewEncapsulation} from '@angular/core';
import {
  trigger
  , style 
  , animate 
  , transition 
  , keyframes 
} from '@angular/animations';

interface QuizDisplay {
  name: string;
  originalName: string;
  numberQuestions: number;
  questions: questionDisplay[];
  naiveQuestionsCheckSum: string;
}

interface questionDisplay {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailsFromLeft', [
      transition('leftPosition => finalPosition', [
        animate('300ms', keyframes([
          style({ left: '-30px', offset: 0.0 }),
          style({ left: '-20px', offset: 0.25 }),
          style({ left: '-10px', offset: 0.5 }),
          style({ left: '-5px', offset: 0.75 }),
          style({ left: '0px', offset: 1.0 })
        ]))
      ]),
    ]),
    trigger('pulseSaveCancelButtons', [
      transition('nothingToSave => somethingToSave', [
        animate('400ms', keyframes([
          style({ transform: 'scale(1.0)', 'transform-origin': 'top left', offset: 0.0 }),
          style({ transform: 'scale(1.2)', 'transform-origin': 'top left', offset: 0.5 }),
          style({ transform: 'scale(1.0)', 'transform-origin': 'top left', offset: 1.0 })
        ]))
      ])
    ])
  ]
})
export class AppComponent {

  quizzes: QuizDisplay[] = [];
  quizLoadingError: boolean = false;

  constructor (private quizSvc: QuizService) {
  }

  ngOnInit() {
    this.loadQuizzes();
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

  reloadQuizzes() {
    this.selectedQuiz = undefined;
    this.loadQuizzes();
  }

  private loadQuizzes() {

    this.quizSvc.getQuizzes().subscribe(
      data => this.quizzes = (<QuizDisplay[]> data).map(x => ({
        ...x
        , originalName: x.name
        , naiveQuestionsCheckSum: x.questions.map(y => y.name).join("~")
      }))
      , error => this.quizLoadingError = true
    );
  }

  selectedQuiz = undefined;
  selectQuiz(q) 
  {
    console.log(q);
    this.selectedQuiz = q;
    this.detailsAnimationState = "finalPosition";
  }

  saveQuizzes() {
    const changedQuizzes = this.quizzes
      .filter(
        x => x.name !== x.originalName
        && (x.originalName !== "New Quiz"
        || x.naiveQuestionsCheckSum !== x.questions.map(y => y.name).join("~"))
      );

    this.quizSvc.saveQuizzes(changedQuizzes).subscribe(
      data => console.log(data)
      , error => data => console.log(error)
    );
  }

  addNewQuiz() {
    let q = { 
      name: "New Quiz"
      , originalName: "New Quiz"
      , numberQuestions: 0
      , questions: []
      , naiveQuestionsCheckSum: ""
    };

    this.quizzes = [...this.quizzes, q];
    this.selectQuiz(q);
  }
  
  newQuestion = undefined;
  addNewQuestion() {
    this.selectedQuiz.questions = [...this.selectedQuiz.questions, {name: this.newQuestion}];
    this.updateQuizLength();
    this.newQuestion = "";

    console.log(this.selectedQuiz.naiveQuestionsCheckSum);
  }

  removeQuiz(deletion) {
    this.quizzes = this.quizzes.filter(x => x !== deletion);
    this.selectedQuiz = undefined;
  }

  removeAllQuizzes() {
    this.quizzes = this.quizzes.filter(x => x !== x);
  }

  removeQuestion(deletion) {
    this.selectedQuiz.questions = this.selectedQuiz.questions.filter(x => x !== deletion);
    this.updateQuizLength();
  }

  updateQuizLength() {
    this.selectedQuiz.numberQuestions = this.selectedQuiz.questions.length;
  }

  get numberOfChangedQuizzes() {
    let changedQuizzes = this.quizzes.filter( 
      x => x.name !== x.originalName
      || x.originalName === "New Quiz"
      || x.naiveQuestionsCheckSum !== x.questions.map(y => y.name).join("~")
    );
    return changedQuizzes.length;
  }

  detailsAnimationState = "leftPosition";

  detailsFromLeftAnimationComplete() {
    this.detailsAnimationState = "leftPosition";
  }

  title = 'quiz-editor';

  dumb: string = "foo123";

  titleColorDanger = this.dumb === 'foo' ? true : false;
  titleBackgroundColorDanger = false;

  headingTwoBackgroundColor = this.dumb === 'foo' ? 'Red' : 'Blue';

  imageWidth: number = 100;

  increaseImageWidth = () => this.imageWidth *= 1.5;
}