import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityPatchComponent } from './quantity-patch.component';

describe('QuantityPatchComponent', () => {
  let component: QuantityPatchComponent;
  let fixture: ComponentFixture<QuantityPatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuantityPatchComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityPatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
