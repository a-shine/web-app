import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  moveToLogin() {
    this.router.navigate(['/login']);
  }

  public logout() {
    localStorage.removeItem('token');
    this.moveToLogin();
  }

}
