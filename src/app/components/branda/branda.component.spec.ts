import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandaComponent } from './branda.component';

describe('BrandaComponent', () => {
  let component: BrandaComponent;
  let fixture: ComponentFixture<BrandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
