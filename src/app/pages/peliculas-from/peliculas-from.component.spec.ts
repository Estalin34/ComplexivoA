import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculasFromComponent } from './peliculas-from.component';

describe('PeliculasFromComponent', () => {
  let component: PeliculasFromComponent;
  let fixture: ComponentFixture<PeliculasFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeliculasFromComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeliculasFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
