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
  selector: 'app-trim-sample',
  templateUrl: './trim-sample.component.html',
  styleUrls: ['./trim-sample.component.scss'],
})
export class TrimSampleComponent implements OnInit {

  constructor () {
  }

  readonly fieldA = new UntypedFormControl('', Validators.required);
  readonly fieldB = new UntypedFormControl('');
  readonly fieldC = new UntypedFormControl('');

  readonly formA = new UntypedFormGroup({
    fieldA: this.fieldA,
    fieldB: this.fieldB,
    fieldC: this.fieldC,
  });

  ngOnInit () {
  }

  submit () {
    alert('to submit');
  }

}
