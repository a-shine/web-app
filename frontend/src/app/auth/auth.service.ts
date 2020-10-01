import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(userData): Observable<any> {
    return this.http.post(environment.apiURL+'/user/register/', userData);
  }

  loginUser(userData): Observable<any> {
    return this.http.post(environment.apiURL+'/user/auth/', userData);
  }

  public isAuthenticated(): boolean {
    if (localStorage.getItem('token') !== null) return true;
    else return false; 
  }

  public addAuthToken() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + localStorage.getItem('token')
      })
    };
    return httpOptions;
  }

  getUserData(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + localStorage.getItem('token')
      })
    };
    return this.http.get(environment.apiURL+'/user/auth/', httpOptions)
  }
}
