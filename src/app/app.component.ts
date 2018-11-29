import { Component, HostBinding } from '@angular/core';
import { QuizService } from './quiz.service';
import {
  trigger
  , keyframes
  , style
  , animate
  , transition
} from '@angular/animations';

interface quizDisplay {
  name: string;
  originalName: string;
  numberQuestions: number;
  questions: questionDisplay[];
  naiveQuestionsChecksum: string; //checksums check for deltas in variables to see if changes have occurred
}

interface questionDisplay {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('detailsFromBottom', [
      transition('bottomPosition => finalPosition', [
        animate('300ms', keyframes([
          style({ bottom: '-90vh', offset: 0.0 }),
          style({ bottom: '-50vh', offset: 0.125 }),
          style({ bottom: '-25vh', offset: 0.25 }),
          style({ bottom: '-20vh', offset: 0.375 }),
          style({ bottom: '-15vh', offset: 0.5 }),
          style({ bottom: '-10vh', offset: 0.625 }),
          style({ bottom: '-5vh', offset: 0.75 }),
          style({ bottom: '-2.5vh', offset: 0.875 }),
          style({ bottom: '0vh', offset: 1.0 }),
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

  quizzes: quizDisplay[] = [];
  wasErrorLoadingQuizzes: boolean = false;
  selectedQuiz = undefined;
  questions = [];
  detailsAnimationState: string = "bottomPosition";

  // this is a read-only property
  get numberOfChangedQuizzes() {
    let changedQuizzes = this.quizzes.filter(x =>
      x.name !== x.originalName
      || x.originalName === "New Untitled Quiz"
      || x.naiveQuestionsChecksum !== x.questions.map(y => y.name).join("~")
    );
    return changedQuizzes.length;
  }

  constructor (private quizSvc: QuizService) {
  }

  ngOnInit() {
    this.quizSvc.getQuizzes().subscribe(
      data => this.quizzes = (<quizDisplay[]> data).map(x => ({
        ...x
        , originalName: x.name
        , naiveQuestionsChecksum: x.questions.map(y => y.name).join("~")
      })) // data is being shaped with map to include data from service and give it an originalName field
      , error => this.wasErrorLoadingQuizzes = true
    );
  }

  reloadQuizzes() {
    console.log('foo');
  }

  selectQuiz(q) {
    this.selectedQuiz = q;
    this.detailsAnimationState = "finalPosition";
  }

  detailsFromBottomAnimationComplete() {
    this.detailsAnimationState = "bottomPosition";
  }

  addNewQuiz() {
    let q = {
      name: "New Untitled Quiz"
      , originalName: "New Untitled Quiz"
      , numberQuestions: 0
      , questions: []
      , naiveQuestionsChecksum: ""
    };
    this.quizzes = [...this.quizzes, q];
    this.selectQuiz(q);
  }

  addNewQuestion(selectedQuiz) {
    selectedQuiz.questions = [...selectedQuiz.questions, {name: "question"} ];
    selectedQuiz.numberQuestions = selectedQuiz.questions.length;
  }

  deleteQuestion(question) {
    this.selectedQuiz.questions = this.selectedQuiz.questions.filter(x => x !== question);
    this.selectedQuiz.numberQuestions = this.selectedQuiz.numberQuestions - 1;
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
