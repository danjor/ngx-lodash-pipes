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

import { NgxCleaveDirective } from '../lib';

@Component({
  template: `
    <input type="text" #input1 [(ngModel)]="value" [cleave]="{creditCard: true}">
    <div [formGroup]="formA">
      <input type="text" #input2 formControlName="fieldA" [cleave]="numeralOption">
    </div>
    <div [formGroup]="formB">
      <input type="text" #input3 formControlName="fieldB" [cleave]="{blocks: [2, 5, 5], onValueChanged: onValueChanged}">
      <input type="text" #input4 formControlName="fieldC" cleave>
    </div>
    <input [cleave]="{blocks: [2, 5, 5]}">
  `,
})
class TestComponent {
  @ViewChild('input1') input1: ElementRef;
  @ViewChild('input2') input2: ElementRef;
  @ViewChild('input3') input3: ElementRef;
  @ViewChild('input4') input4: ElementRef;

  readonly fieldA = new UntypedFormControl('7654321');
  readonly formA = new UntypedFormGroup({
    fieldA: this.fieldA,
  });

  numeralOption = {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
  };

  readonly fieldB = new UntypedFormControl('abcdefghijklmn');
  readonly fieldC = new UntypedFormControl('');
  readonly formB = new UntypedFormGroup({
    fieldB: this.fieldB,
    fieldC: this.fieldC,
  }, {
    updateOn: 'blur',
  });

  value = '123412345123456';

  public onValueChanged ({ target }) {
    console.log(target);
  }
}

describe('NgxCleaveDirective', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  const _log = console.log;
  const noop = function () {};

  beforeAll(() => {
    console.log = noop;
    spyOn(console, 'warn');
  });

  afterAll(() => {
    console.log = _log;
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        NgxCleaveDirective,
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

  it('should call console.warn', async () => {
    expect(console.warn).toHaveBeenCalled();
  });

  it('should cleave initial value of input1', async () => {
    await fixture.whenStable();

    const el1 = component.input1.nativeElement;
    expect(el1.value).toBe('1234 12345 123456');
  });

  it('should cleave the value of input1 on input', () => {
    const el1 = component.input1.nativeElement;

    el1.value = '4621000098762224';
    el1.dispatchEvent(new Event('input'));
    expect(el1.value).toBe('4621 0000 9876 2224');
    expect(component.value).toBe('4621 0000 9876 2224');
  });

  it('should cleave the value of input1 on ngModel changed', async () => {
    const el1 = component.input1.nativeElement;

    component.value = '4621000098762224';
    fixture.detectChanges();

    await fixture.whenStable();

    expect(el1.value).toBe('4621 0000 9876 2224');
    expect(component.value).toBe('4621 0000 9876 2224');
  });

  it('should cleave initial value of input2', () => {
    const el2 = component.input2.nativeElement;
    expect(el2.value).toBe('7,654,321');
  });

  it('should cleave the value of input2 on input', () => {
    const el2 = component.input2.nativeElement;

    el2.value = '1234567';
    el2.dispatchEvent(new Event('input'));
    expect(el2.value).toBe('1,234,567');
    expect(component.fieldA.value).toBe('1,234,567');
  });

  it('should cleave the value of input2 on option updated', () => {
    const el2 = component.input2.nativeElement;

    component.numeralOption = {
      numeral: true,
      numeralThousandsGroupStyle: 'wan',
    };

    fixture.detectChanges();

    expect(el2.value).toBe('765,4321');
    expect(component.fieldA.value).toBe('765,4321');
  });

  it('should cleave the value of input2 on form control value updated', async () => {
    const el2 = component.input2.nativeElement;

    component.fieldA.setValue('7654321');

    await fixture.whenStable();

    expect(el2.value).toBe('7,654,321');
    expect(component.fieldA.value).toBe('7,654,321');
  });

  it('should cleave initial value of input3', () => {
    const el3 = component.input3.nativeElement;
    expect(el3.value).toBe('ab cdefg hijkl');
  });

  it('should cleave the value of input3 on input', () => {
    spyOn(console, 'log');

    const el3 = component.input3.nativeElement;

    el3.value = 'anapplea day';
    el3.dispatchEvent(new Event('input'));
    expect(el3.value).toBe('an apple aday');
    expect(component.fieldB.value).toBe('abcdefghijklmn');

    el3.dispatchEvent(new Event('blur'));
    expect(component.fieldB.value).toBe('an apple aday');

    expect(console.log).toHaveBeenCalledTimes(2);
  });

  it('should not cleave the value of input4', () => {
    const el4 = component.input4.nativeElement;

    el4.value = 'an apple a day';
    el4.dispatchEvent(new Event('input'));
    expect(el4.value).toBe('an apple a day');
    expect(component.fieldC.value).toBe('');

    el4.dispatchEvent(new Event('blur'));
    expect(component.fieldC.value).toBe('an apple a day');
  });

});
