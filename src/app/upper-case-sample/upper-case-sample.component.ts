import {
  Component,
  OnInit,
} from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-upper-case-sample',
  templateUrl: './upper-case-sample.component.html',
  styleUrls: ['./upper-case-sample.component.scss'],
})
export class UpperCaseSampleComponent implements OnInit {

  constructor () {
  }

  readonly fieldA = new UntypedFormControl('', Validators.required);
  readonly fieldB = new UntypedFormControl('');

  readonly formA = new UntypedFormGroup({
    fieldA: this.fieldA,
    fieldB: this.fieldB,
  });

  ngOnInit () {
  }

  submit () {
    alert('to submit');
  }

}
