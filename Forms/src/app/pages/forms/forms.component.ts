import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent {
  generi: string[] = ['uomo', 'donna', 'altro'];
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        nome: this.fb.control('', [Validators.required]),
        cognome: this.fb.control('', [Validators.required]),
        password: this.fb.control('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confermaPassword: this.fb.control('', [Validators.required]),
        img: this.fb.control('', [Validators.required]),
        textArea: this.fb.control('', [Validators.required]),
        Usarname: this.fb.control('', [Validators.required]),
        genere: this.fb.control('', [Validators.required]),
      },
      { validators: this.passwordMatchValidator() }
    );
  }

  send() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Segna tutti i campi come 'touched' se il form è invalido
      return;
    }
    console.log(this.form.value);
  }

  isInvalidTouched(fieldName: string) {
    const field = this.form.get(fieldName);
    return field?.invalid && field?.touched;
  }

  // Validatore personalizzato
  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confermaPassword = control.get('confermaPassword');

      if (
        password &&
        confermaPassword &&
        password.value !== confermaPassword.value
      ) {
        return { passwordsMismatch: true };
      }
      return null;
    };
  }

  isPasswordMismatch() {
    return (
      this.form.hasError('passwordsMismatch') &&
      this.form.get('confermaPassword')?.touched
    );
  }
}
