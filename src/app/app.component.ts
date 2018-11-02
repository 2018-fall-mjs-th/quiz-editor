import { Component, Injectable } from '@angular/core';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

	quizzes: any = [];

	wasErrorLoadingQuizzes: boolean = false;

	constructor (private quizSvc: QuizService) {


	}

	ngOnInit () {
		//console.log(this.quizSvc.getQuizzes());
		//this.quizzes = this.quizSvc.getQuizzes();

		this.quizSvc.getQuizzes().subscribe(
			// (data) => {
			// 	console.log(data);
			// 	this.quizzes = data;
			// }

			data => this.quizzes = data
			, error => this.wasErrorLoadingQuizzes = true
		);
	}

	learningPromises() {
		console.log("learningPromises");

		let x = this.quizSvc.getNumberOfQuizzes(true);
		console.log(x);

		x.then( 
			n => console.log(n)
		);

		let y = this.quizSvc.getNumberOfQuizzes(true);
		console.log(y);

		y.then( 
			n => console.log(n)
		).catch(
			e => console.log(e)
		);
	}

	async learingPromisWithAsyncAwait() {
	
		console.log("learingPromisWithAsyncAwait");

		try {
			let x = await this.quizSvc.getNumberOfQuizzes(true);
			console.log(x);

			let y = await this.quizSvc.getNumberOfQuizzes(true);
			console.log(y);
		}

		catch (e) {
			console.log(e);
		}
	}

	async learningPromisesWithAwaitAll() {
		console.log("learingPromisWithAsyncAwait");

		try {
			let x = this.quizSvc.getNumberOfQuizzes(true);
			console.log(x);

			let y = this.quizSvc.getNumberOfQuizzes(true);
			console.log(y)
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

	imageWidth: number = 300;

	increaseImageWidth = () => this.imageWidth *= 1.5;

}

