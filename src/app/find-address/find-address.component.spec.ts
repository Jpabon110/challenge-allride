import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAddressComponent } from './find-address.component';

describe('FindAddressComponent', () => {
  let component: FindAddressComponent;
  let fixture: ComponentFixture<FindAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
