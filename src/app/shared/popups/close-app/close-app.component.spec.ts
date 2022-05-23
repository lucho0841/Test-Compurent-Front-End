import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseAppComponent } from './close-app.component';

describe('CloseAppComponent', () => {
  let component: CloseAppComponent;
  let fixture: ComponentFixture<CloseAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
