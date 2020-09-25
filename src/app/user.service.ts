import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from './models/user-data';
import { Project } from './models/gitlab';
import { Cache } from './decorators/cache.decorator';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private SERVER_URL = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  @Cache({ ttl: 60 })
  public get(): Observable<UserData> {
    return this.httpClient.get<UserData>(`${this.SERVER_URL}/user`, {withCredentials: true});
  }

  @Cache({ ttl: 3600 })
  public getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(`${this.SERVER_URL}/api/projects`, {withCredentials: true});
  }
}
