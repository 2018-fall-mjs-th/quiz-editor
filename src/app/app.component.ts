import { Component } from '@angular/core';
import { QuizService } from './quiz.service';

interface quizDisplay {
<<<<<<< HEAD
  name: String;
  originalName: String;
=======
  name: string;
  originalName: string;
>>>>>>> 24047b27adbef926ab68c86859ba2295767fc1e5
  numberQuestions: number;
  questions: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  quizzes: quizDisplay[] = [];
  wasErrorLoadingQuizzes: boolean = false;
  questions: any [];

  constructor (private quizSvc: QuizService) {
  }

  ngOnInit() {
    //console.log(this.quizSvc.getQuizzes());
    this.quizSvc.getQuizzes().subscribe(
      // (data) => {
      //   console.log(data);
      //   this.quizzes = data
      // }
      data => this.quizzes = (<quizDisplay[]> data).map(x => ({
        ...x
        , originalName: x.name
      }))
      , error => this.wasErrorLoadingQuizzes = true
    );
  }

  selectedQuiz = undefined;

  selectQuiz(q) {
    console.log(q);
    this.selectedQuiz = q;
  }

  addNewQuiz() {
<<<<<<< HEAD
    let q = {name: "New Untitled Quiz"
            , originalName: "New Untitlted Quiz"
            , numberQuestions: 0
            , questions: []
    };
    this.quizzes = [...this.quizzes, q]
    this.selectQuiz(q)
  }


  addNewQuestion() {
    if (this.selectedQuiz.questions) {
      this.selectedQuiz.questions = [...this.selectedQuiz.questions, { name: "New Question" } ];
    } else {
    this.selectedQuiz.questions = [ { name: "New Question" } ];
    }
    console.log(this.numberOfChangedQuizzes);

  }

  removeQuestion(question) {
    this.selectedQuiz.questions = this.selectedQuiz.questions.filter(x => x !== question);
=======
    let q = { 
      name: "New Untitled Quiz"
      , originalName: "New Untitled Quiz"
      , numberQuestions: 0
      , questions: []
    };

    this.quizzes = [...this.quizzes, q];
    this.selectQuiz(q);
  }

  addNewQuestion(selectedQuiz) {
    selectedQuiz.questions = [...selectedQuiz.questions, {"name": "New untitled question"}];
    selectedQuiz.numberQuestions = selectedQuiz.questions.length;

    console.log(this.numberOfChangedQuizzes);
    //this.numberOfChangedQuizzes = 75;
>>>>>>> 24047b27adbef926ab68c86859ba2295767fc1e5
  }

  //TS read only property..
  get numberOfChangedQuizzes() {
    let changedQuizzes = this.quizzes.filter(x => x.name !== x.originalName);
    return changedQuizzes.length;
  }


<<<<<<< HEAD
=======
  //numberOfChangedQuizzes = 2;

  // TS readonly property...
  get numberOfChangedQuizzes() {
    let changedQuizzes = this.quizzes.filter(x => x.name !== x.originalName );
    return changedQuizzes.length;
  }



  // Learning promises functions below...

>>>>>>> 24047b27adbef926ab68c86859ba2295767fc1e5

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
