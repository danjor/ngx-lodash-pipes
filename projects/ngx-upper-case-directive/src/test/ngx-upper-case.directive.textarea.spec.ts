import {
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { NgxUpperCaseDirective } from '../lib';

@Component({
  template: `
    <textarea #input1 [(ngModel)]="value" upperCase></textarea>
    <div [formGroup]="formA">
      <textarea #input2 formControlName="fieldA" upperCase="blur"></textarea>
    </div>
    <div [formGroup]="formB">
      <textarea #input3 formControlName="fieldB" upperCase="blur"></textarea>
      <textarea #input4 formControlName="fieldC" upperCase></textarea>
    </div>
  `,
})
class TestComponent {
  @ViewChild('input1') input1: ElementRef;
  @ViewChild('input2') input2: ElementRef;
  @ViewChild('input3') input3: ElementRef;
  @ViewChild('input4') input4: ElementRef;

  readonly fieldA = new UntypedFormControl('');
  readonly formA = new UntypedFormGroup({
    fieldA: this.fieldA,
  });

  readonly fieldB = new UntypedFormControl('');
  readonly fieldC = new UntypedFormControl('');
  readonly formB = new UntypedFormGroup({
    fieldB: this.fieldB,
    fieldC: this.fieldC,
  }, {
    updateOn: 'blur',
  });

  value = '';
}

describe('NgxLowerCaseDirective for textarea', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        NgxUpperCaseDirective,
        TestComponent,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should convert the value of input1 on input or blur', () => {
    const el1 = component.input1.nativeElement;

    el1.value = 'ngxUpperCaseDirective';
    el1.dispatchEvent(new Event('input'));
    expect(el1.value).toBe('NGXUPPERCASEDIRECTIVE');
    expect(component.value).toBe('NGXUPPERCASEDIRECTIVE');

    el1.value = 'ngxUpperCaseDirective';
    el1.dispatchEvent(new Event('blur'));
    expect(el1.value).toBe('NGXUPPERCASEDIRECTIVE');
    expect(component.value).toBe('NGXUPPERCASEDIRECTIVE');
  });

  it('should not convert the value of input2 on input', () => {
    const el2 = component.input2.nativeElement;

    el2.value = 'ngxUpperCaseDirective';
    el2.dispatchEvent(new Event('input'));
    expect(el2.value).toBe('ngxUpperCaseDirective');
    expect(component.fieldA.value).toBe('ngxUpperCaseDirective');
  });

  it('should convert the value of input2 on blur', () => {
    const el2 = component.input2.nativeElement;

    el2.value = 'ngxUpperCaseDirective';
    el2.dispatchEvent(new Event('blur'));
    expect(el2.value).toBe('NGXUPPERCASEDIRECTIVE');
    expect(component.fieldA.value).toBe('NGXUPPERCASEDIRECTIVE');
  });

  it('should not update the value of fieldB on input', () => {
    const el3 = component.input3.nativeElement;

    el3.value = 'ngxUpperCaseDirective';
    el3.dispatchEvent(new Event('input'));
    expect(el3.value).toBe('ngxUpperCaseDirective');
    expect(component.fieldB.value).toBe('');

  });

  it('should convert the value of input3 on blur', () => {
    const el3 = component.input3.nativeElement;

    el3.value = 'ngxUpperCaseDirective';
    el3.dispatchEvent(new Event('blur'));
    expect(el3.value).toBe('NGXUPPERCASEDIRECTIVE');
    expect(component.fieldB.value).toBe('NGXUPPERCASEDIRECTIVE');
  });

  it('should not update the value of fieldC on input', () => {
    const el4 = component.input4.nativeElement;

    el4.value = 'ngxUpperCaseDirective';
    el4.dispatchEvent(new Event('input'));
    expect(el4.value).toBe('NGXUPPERCASEDIRECTIVE');
    expect(component.fieldC.value).toBe('');

  });

  it('should convert the value of input4 on blur', () => {
    const el4 = component.input4.nativeElement;

    el4.value = 'ngxUpperCaseDirective';
    el4.dispatchEvent(new Event('blur'));
    expect(el4.value).toBe('NGXUPPERCASEDIRECTIVE');
    expect(component.fieldC.value).toBe('NGXUPPERCASEDIRECTIVE');
  });

});
