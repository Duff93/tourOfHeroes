import { TestBed } from '@angular/core/testing';

import { MessageCustomService } from './message-custom.service';

describe('MessageService', () => {
  let service: MessageCustomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageCustomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
