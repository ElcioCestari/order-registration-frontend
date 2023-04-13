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
    return null;
  }

  onBlurFormControl(formControlName: string, formGroup: FormGroup) {
    formGroup?.get(formControlName)?.markAsTouched();
  }
}
