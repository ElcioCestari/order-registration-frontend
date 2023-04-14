import {Component, Input} from "@angular/core";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import ErrorMsgService from "../services/error-msg-service";

@Component({
  template: ''
})
export class BaseInputComponent {

  @Input() label: string = '';
  @Input() fieldName: string = '';
  @Input() placeHolder: string = '';
  @Input() formGroup: FormGroup = this.fb.group({});
  @Input() formControl: AbstractControl = new FormControl();

  constructor(
    private readonly fb: FormBuilder,
    private readonly errorMsgService: ErrorMsgService) {
  }

  getFormControl(): AbstractControl | null {
    return this.formControl
  }

  getErrorMessage(control: AbstractControl | null): string | null {
    return this.errorMsgService.getErrorMessage(control)
  }

  onBlurFormControl(formControlName: string) {
    // this.errorMsgService.onBlurFormControlName(formControlName)
  }
}
