import { TestBed } from '@angular/core/testing';

import { QuizServiceService } from './quiz-service.service';

describe('QuizServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuizServiceService = TestBed.get(QuizServiceService);
    expect(service).toBeTruthy();
  });
});
