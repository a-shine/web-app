import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ AuthService ]
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required)
  })

  constructor(private router:Router, private authService:AuthService) { }
  user;

  ngOnInit(): void {
  }

  moveToRegister(){
    this.router.navigate(['/signup']);
  }

  login(){
    if (!this.loginForm.valid){
      console.log('Invalid'); return;
    }

    // change format so it can be sent to database
    this.user = {
      username: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    }

    this.authService.loginUser(this.user).subscribe(
      responce => {
        localStorage.setItem('token', responce.token)
        this.router.navigate(['/app'])
      }, error => console.log('Error: ', error)
    );
    // Implement feedback systsem here if passwords do not match, invalid email...
  }

}
