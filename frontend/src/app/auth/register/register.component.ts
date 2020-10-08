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
  firstNameForm:FormGroup;
  lastNameForm:FormGroup;
  emailForm:FormGroup;
  passwordForm: FormGroup;
  confirmPasswordForm: FormGroup;
  
  passMatch:boolean = false;
  failed:boolean = false;

  // registerForm:FormGroup = new FormGroup({
  //   firstName: new FormControl(null, Validators.required),
  //   lastName: new FormControl(null, Validators.required),
  //   email: new FormControl(null, [Validators.email, Validators.required]),
  //   password: new FormControl(null, Validators.required),
  //   confirmPassword: new FormControl(null, Validators.required),
  // })

  constructor(private router:Router, private authService:AuthService, private formBuilder: FormBuilder) { }
  user;

  ngOnInit(): void {
    this.firstNameForm = this.formBuilder.group({
      firstName: new FormControl(null, Validators.required)
    })
    this.lastNameForm = this.formBuilder.group({
      lastName: new FormControl(null, Validators.required)
    })
    this.emailForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
    this.passwordForm = this.formBuilder.group({
      password: new FormControl(null, Validators.required)
    })
    this.confirmPasswordForm = this.formBuilder.group({
      password: new FormControl(null, Validators.required)
    })
  }

  moveToLogin(){
    this.router.navigate(['/login']);
  }

  register(){
    if(!this.confirmPasswordForm.valid || (this.passwordForm.controls.password.value != this.confirmPasswordForm.controls.password.value)) {
      this.passMatch = true;
      return;
    }

    // change format so it can be sent to database
    this.user = {
      first_name: this.firstNameForm.controls.firstName.value,
      last_name: this.lastNameForm.controls.lastName.value,
      email: this.emailForm.controls.email.value,
      username: this.emailForm.controls.email.value,
      password: this.passwordForm.controls.password.value
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
