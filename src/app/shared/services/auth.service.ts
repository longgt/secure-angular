import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authenticated(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.http.get('http://localhost:3000/token/verify', {withCredentials: true}).subscribe(() => {
        resolve(true);
      }, (err) => {
        console.log('authenticated', err);
        resolve(false);
      });
    });
  }
}
