import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';
import {
  trigger
  , style
  , animate
  , transition
  , keyframes
} from '@angular/animations';
import { LifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';

interface QuizDisplay {

  name: string;
  originalName: string;

  numberQuestions: number;

  questions: QuestionDisplay[];
  naiveQuestionsChecksum: string;
}

interface QuestionDisplay {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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
export class AppComponent implements OnInit {

  constructor (private quizSvc: QuizService) {
  }


  // numberOfChangedQuizzes = 2;

  // TS readonly property...
  get numberOfChangedQuizzes() {
    const changedQuizzes = this.quizzes.filter(x =>
      x.name !== x.originalName
      || x.originalName === 'New Untitled Quiz'
      || x.naiveQuestionsChecksum !== x.questions.map(y => y.name).join('~')
    );
    return changedQuizzes.length;
  }

  quizzes: QuizDisplay[] = [];
  wasErrorLoadingQuizzes = false;

  selectedQuiz = undefined;

  detailsAnimationState = 'leftPosition';

  title = 'quiz-editor';

  dumb = 'foo123';

  titleColorDanger = this.dumb === 'foo' ? true : false;
  titleBackgroundColorDanger = false;

  headingTwoBackgroundColor = this.dumb === 'foo' ? 'Red' : 'Blue';

  imageWidth = 100;

  ngOnInit() {
    // console.log(this.quizSvc.getQuizzes());
    this.loadQuizzes();
  }

  private loadQuizzes() {
    this.quizSvc.getQuizzes().subscribe(
      // (data) => {
      //   console.log(data);
      //   this.quizzes = data
      // }
      data => this.quizzes = (<QuizDisplay[]>data).map(x => ({
        ...x,
        originalName: x.name,
        naiveQuestionsChecksum: x.questions.map(y => y.name).join('~')
      })), error => this.wasErrorLoadingQuizzes = true);
  }

  /**
   * New method written in-class. 
   */
  reloadQuizzes() {
    this.loadQuizzes();
    this.selectedQuiz = undefined;
    console.log('Reloaded Quizzes');
  }

  /**
   * New method written in-class
   */
  saveQuizzes() {
    console.log('Saving Quizzes...');
    const changedQuizzes = this.quizzes.filter(aQuiz =>
      aQuiz.originalName !== 'New Untitled Quiz'
      && (aQuiz.name !== aQuiz.originalName 
        || aQuiz.naiveQuestionsChecksum !== aQuiz.questions.map(y => y.name).join('~'))
    );

    /*
    const newQuizzes = [
      { "quizName": "Test"
        , "quizQuestions": [
            "qOne"
            , "qTwo"
        ]
    }];
    */



  
      

    // You have to .subscribe to observables 
    this.quizSvc.saveQuizzes(changedQuizzes, newQuizzes).subscribe(
      data => console.log('Success ' + data), error => console.log(error)
    );

  }

  selectQuiz(q) {
    // console.log(q);
    this.selectedQuiz = q;
    this.detailsAnimationState = 'finalPosition';
  }

  addNewQuiz() {
    const q = {
      name: 'New Untitled Quiz'
      , originalName: 'New Untitled Quiz'
      , numberQuestions: 0
      , questions: []
      , naiveQuestionsChecksum: ''
    };

    this.quizzes = [...this.quizzes, q];
    this.selectQuiz(q);
  }

  addNewQuestion(selectedQuiz) {
    selectedQuiz.questions = [...selectedQuiz.questions, {'name': 'New untitled question'}];
    selectedQuiz.numberQuestions = selectedQuiz.questions.length;

    console.log(this.numberOfChangedQuizzes);
    // this.numberOfChangedQuizzes = 75;

    console.log(this.selectedQuiz.naiveQuestionsChecksum);
  }

  removeQuestion(selectedQuiz, selectedQuestion) {
    selectedQuiz.questions = selectedQuiz.questions.filter(n => n !== selectedQuestion);
    selectedQuiz.numberQuestions = selectedQuiz.questions.length;
  }

  detailsFromLeftAnimationComplete() {
    this.detailsAnimationState = 'leftPosition';
  }

  // Learning promises functions below...


  learningPromises() {
    console.log('learningPromises()');

    const x = this.quizSvc.getNumberOfQuizzes(true);
    console.log(x);

    x.then(
      n => {
        console.log(n);

        const y = this.quizSvc.getNumberOfQuizzes(false);
        console.log(y);

        y.then(
          n2 => console.log(n2)
        ).catch(
          e => console.log(e)
        );
      }

    ).catch(
      e => console.log(e)
    );


  }

  async learningPromisesWithAsyncAwait() {
    console.log('learningPromisesWithAsyncAwait()');

    try {
      const x = await this.quizSvc.getNumberOfQuizzes(true);
      console.log(x);

      const y = await this.quizSvc.getNumberOfQuizzes(false);
      console.log(y);
    } catch (e) {
      console.log(e);
    }
  }

  async learningPromisesWithAwaitAll() {
    console.log('learningPromisesWithAsyncAwait()');

    try {
      const x = this.quizSvc.getNumberOfQuizzes(true);
      console.log(x);

      const y = this.quizSvc.getNumberOfQuizzes(true);
      console.log(y);

      // let results = await Promise.race([x, y]);
      const results = await Promise.all([x, y]);
      console.log(results);
    } catch (e) {
      console.log(e);
    }
  }
  // imageWidth = '100px';

  increaseImageWidth = () => this.imageWidth *= 1.5;



}
