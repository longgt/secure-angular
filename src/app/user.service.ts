import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserData } from './models/user-data';
import { Project } from './models/gitlab';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private SERVER_URL = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  public get(): Observable<UserData> {
    return this.httpClient.get<UserData>(`${this.SERVER_URL}/user`, {withCredentials: true});
  }

  public getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(`${this.SERVER_URL}/api/projects`, {withCredentials: true});
  }
}