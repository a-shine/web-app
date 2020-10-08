import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ AuthService ]
})
export class RegisterComponent implements OnInit {
  passMatch:boolean = false;
  invalidForm:boolean = false;
  failed:boolean = false;

  registerForm:FormGroup = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required),
    confirmPassword: new FormControl(null, Validators.required),
  })

  constructor(private router:Router, private authService:AuthService) { }
  user;

  ngOnInit(): void {
  }

  moveToLogin(){
    this.router.navigate(['/login']);
  }

  register(){
    if(!this.registerForm.valid) {
      this.invalidForm = true;
      return;
    }
    if(this.registerForm.controls.password.value != this.registerForm.controls.confirmPassword.value) {
      this.passMatch = true;
      return;
    }

    // change format so it can be sent to database
    this.user = {
      first_name: this.registerForm.controls.firstName.value,
      last_name: this.registerForm.controls.lastName.value,
      email: this.registerForm.controls.email.value,
      username: this.registerForm.controls.email.value,
      password: this.registerForm.controls.password.value
    }

    this.authService.registerUser(this.user).subscribe(
      response => {
        this.moveToLogin()
      }, error => {
        console.log('Error: ', error)
        this.failed = true;
      });
    // Implement feedback systsem here if passwords do not match, invalid email...
  }
}
