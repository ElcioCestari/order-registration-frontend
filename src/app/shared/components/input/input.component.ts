import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import ErrorMsgService from "../../services/error-msg-service";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() label: string = '';
  @Input() fieldName: string = '';
  @Input() placeHolder: string = '';
  @Input() formGroup: FormGroup = this.fb.group({});
  @Input() formControl: AbstractControl = new FormControl();

  ngOnInit(): void {
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly errorMsgService: ErrorMsgService) {
  }

  getFormControl(): AbstractControl | null {
    return this.formControl
  }

  getErrorMessage(control: AbstractControl | null): string | null {
    console.error('entrou getErrorMessage')
    return this.errorMsgService.getErrorMessage(control)
  }

  onBlurFormControl(formControlName: string) {
    console.error('entrou onBlurFormControl')
    // this.errorMsgService.onBlurFormControlName(formControlName)
  }
}
