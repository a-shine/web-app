import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  // @ViewChild("password") passwordField: ElementRef;
  emailForm: FormGroup;
  passwordForm: FormGroup;
  failed: boolean = false;

  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) { }
  user;

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
    this.passwordForm = this.formBuilder.group({
      password: new FormControl(null, Validators.required)
    })
    setTimeout(() => {
      this.focusInput(0);
    }, 250);
  }

  moveToRegister() {
    this.router.navigate(['/signup']);
  }

  login() {
    if (!this.emailForm.valid || !this.passwordForm.valid) {
      console.log('Invalid'); return;
    }

    this.user = {
      username: this.emailForm.controls.email.value,
      password: this.passwordForm.controls.password.value
    }

    this.authService.loginUser(this.user).subscribe(
      responce => {
        localStorage.setItem('token', responce.token)

        this.router.navigate([''])
      }, error => {
        console.log('Error: ', error)
        this.failed = true;
      });
    // Implement feedback systsem here if passwords do not match, invalid email...
  }

  @ViewChild("email") emailField: ElementRef;
  @ViewChild("password") passwordField: ElementRef;
  focusInput(field: number): void {
    switch (field) {
      case 0: {
        this.emailField.nativeElement.focus();
        break;
      } case 1: {
        setTimeout(() => {
          this.passwordField.nativeElement.focus();
        }, 250);
        break;
      }
    }
  }
}
