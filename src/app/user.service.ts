import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserData } from './models/user-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private SERVER_URL = "http://localhost:3000/user";

  constructor(private httpClient: HttpClient) { }

  public get(): Observable<UserData> {
    return this.httpClient.get<UserData>(this.SERVER_URL, {withCredentials: true});
  }
}