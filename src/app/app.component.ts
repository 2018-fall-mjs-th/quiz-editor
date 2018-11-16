import { Component } from '@angular/core';
import { QuizService } from './quiz.service';
import {
  trigger
  , style
  , animate
  , transition
  , keyframes
} from '@angular/animations';

interface quizDisplay {
  name: string;
  originalName: string;
  numberQuestions: number;
  questions: questionDisplay[];
  naiveQuestionsChecksum: string;
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
  quizzes: quizDisplay[] = [];          // UI display of quizzes (not necessarily committed information )
  responseError: boolean = false;
  selectedQuiz = undefined;             // The selected quiz
  selectedQuestions = undefined;

  constructor (private quizSvc: QuizService) { }

  ngOnInit() {
    if (localStorage.getItem('QuizEditor-Data') != null) {
      this.quizzes = JSON.parse(localStorage.getItem('QuizEditor-Data'));
      console.log('Retrieved quiz data from local storage');
      if (this.quizzes.length == 0) {
        // If the cached data doesn't contain any quizzes - just force a reload
        this.loadQuizzesFromService();
      }
    } else {
      this.loadQuizzesFromService();
    }
  }

  public loadQuizzesFromService() {
    this.quizzes = [];
    this.quizSvc.getQuizzes('Isaac').subscribe(
      data => this.quizzes = (<quizDisplay[]> data).map(x => ({
          ...x
          , originalName: x.name  // Set the originalName as the name 
          , naiveQuestionsChecksum: x.questions.map(y => y.name).join("~")
        }))
      , error => this.responseError = true
    );
    localStorage.setItem('QuizEditor-Data', JSON.stringify(this.quizzes));
  }

  public selectQuiz(q) {
    this.selectedQuiz = q;
    this.updateQuestionCount(q);
  }

  public addNewQuiz() {
    let newQuiz = <quizDisplay> {
      name: "New Quiz"
      , originalName: "New Quiz"
      , numberQuestions: 0
      , questions: []
      , naiveQuestionsChecksum: ""
    };
    this.quizzes = [...this.quizzes, newQuiz];
    this.selectQuiz(newQuiz);
  }

  public addNewQuestion() {
    let newQuestion = <questionDisplay> { name: "New Question", originalName: "New Question" };
    this.selectedQuiz.questions = [...this.selectedQuiz.questions, newQuestion];
    this.updateQuestionCount(this.selectedQuiz);
  }

  public deleteQuestion(questionToRemove) {
    this.selectedQuiz.questions = this.selectedQuiz.questions.filter(aQuestion => {
      return questionToRemove != aQuestion;
    });
    this.updateQuestionCount(this.selectedQuiz);
  }

  public saveQuizAndQuestions() {
    //this.selectedQuiz.questions = this.selectedQuestions;
    localStorage.setItem('QuizEditor-Data', JSON.stringify(this.quizzes));
    console.log('Saved data to local storage');
  }

  public cancelQuizEdits() {
    //this.selectedQuiz.questions = this.selectedQuestions;
  }

  public updateQuestionCount(aQuiz) {
    aQuiz.numberQuestions = aQuiz.questions.length;
  }

  public clearStorage() {
    localStorage.removeItem('QuizEditor-Data');
    this.loadQuizzesFromService();
    this.selectedQuiz = null;
    console.log('Cleared Local Storage');
  }

  // Typescript read-only property
  get numberOfChangedQuizzes() {
    let changedQuizzes = this.quizzes.filter(x => 
      x.name !== x.originalName
      || x.originalName === "New Quiz"
      || x.naiveQuestionsChecksum !== x.questions.map(y => y.name).join("~")
    );
    return changedQuizzes.length;
  }

  
  // Learning Promises Examples (below)
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


