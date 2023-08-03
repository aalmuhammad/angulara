import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorfilmComponent } from './actorfilm.component';

describe('ActorfilmComponent', () => {
  let component: ActorfilmComponent;
  let fixture: ComponentFixture<ActorfilmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActorfilmComponent]
    });
    fixture = TestBed.createComponent(ActorfilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
