import {AbstractControl, FormGroup} from "@angular/forms";
import {Injectable} from "@angular/core";

@Injectable()
export default class ErrorMsgService {

  getErrorMessage(control: AbstractControl | null): string | null {
    if (control?.errors?.['required']) {
      return 'Campo obrigatório'
    }
    if (control?.errors?.['minlength']) {
      return 'Tamanho inválido'
    }
    if (control?.errors?.['min']) {
      return 'Valor minimo inválido'
    }
    if (control?.errors?.['max']) {
      return 'Valor máximo inválido'
    }
    const errors = control?.errors;
    if (errors) {
      const key = Object.keys(errors)[0];
      return control?.errors[key]
    }
    return null;
  }

  onBlurFormControl(formControlName: string, formGroup: FormGroup) {
    formGroup?.get(formControlName)?.markAsTouched();
  }
}
