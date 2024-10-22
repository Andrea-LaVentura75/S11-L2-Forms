import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @ViewChild('f') form!: NgForm;

  submit(form: NgForm) {
    console.log('form inviato al submit', form);
    console.log(form.form.value);
  }
}
