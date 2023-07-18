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
  selector: 'app-lower-case-sample',
  templateUrl: './lower-case-sample.component.html',
  styleUrls: ['./lower-case-sample.component.scss'],
})
export class LowerCaseSampleComponent implements OnInit {

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
