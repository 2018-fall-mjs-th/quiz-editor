import { TestBed } from '@angular/core/testing';

import { QuizService } from './quiz.service';

import { defer } from 'rxjs'

// it('should return an error when the server returns a 404', () => {
//   const errorResponse = new HttpErrorResponse({
//     error: 'test 404 error',
//     status: 404, statusText: 'Not Found'
//   });

//   httpClientSpy.get.and.returnValue(asyncError(errorResponse));

//   quizService.getHeroes().subscribe(
//     heroes => fail('expected an error, not heroes'),
//     error  => expect(error.message).toContain('test 404 error')
//   );
// });




describe('QuizService', () => {

  /** Create async observable that emits-once and completes
 *  after a JS engine turn */
  function asyncData<T>(data: T) {
    return defer(() => Promise.resolve(data));
  }

  //beforeEach(() => TestBed.configureTestingModule({}));
  let httpClientSpy: { get: jasmine.Spy };
  let quizService: QuizService;
  
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    quizService = new QuizService(<any> httpClientSpy);
  });
  

  it('should be created', () => {
    // const service: QuizService = TestBed.get(QuizService);
    expect(quizService).toBeTruthy();
  });

  // it('should return expected quizzes (HttpClient called once)', () => { 
  //   const expectedQuizzes: any[] = [
  //     { 
  //       name: 'Quiz 1'
  //       , numberQuestions: 2
  //       , questions: [
  //         { name: 'Q1' }
  //         , { name: 'Q2' }
  //       ] 
  //     }
  //     , { 
  //       name: 'Quiz 2'
  //       , numberQuestions: 0
  //       , questions: [] 
  //     }
  //   ];

  //   httpClientSpy.get.and.returnValue(asyncData(expectedQuizzes));

  //   quizService.getQuizzes().subscribe(
  //     quizzes => {
  //       //console.log(quizzes);
  //       console.log(quizzes[0].questions[2].name);
  //       //expect(quizzes).toEqual(expectedQuizzes, 'expected quizzes');
  //       expect(quizzes[0].questions[2].name).toEqual('Q1', 'Foo');
  //     }
  //     , fail
  //   );
  //   expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  // });
});
