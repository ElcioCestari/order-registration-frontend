import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import ErrorMsgService from "../services/error-msg-service";

export default class BaseFormComponent {
  constructor(
    protected readonly fb: FormBuilder,
    protected readonly errorMsgService: ErrorMsgService,
    public readonly formGroup: FormGroup
  ) {
  }

  getErrorMessage(control: AbstractControl | null): string | null {
    return this.errorMsgService.getErrorMessage(control)
  }

  onBlurFormControl(formControlName: string) {
    this.errorMsgService.onBlurFormControl(formControlName, this.formGroup)
  }
}
