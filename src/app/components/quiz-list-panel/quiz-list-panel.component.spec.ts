import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizListPanelComponent } from './quiz-list-panel.component';

describe('QuizListPanelComponent', () => {
  let component: QuizListPanelComponent;
  let fixture: ComponentFixture<QuizListPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizListPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizListPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
