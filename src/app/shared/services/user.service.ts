import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cache } from '../decorators/cache.decorator';
import { UserData } from '../../models/user-data';
import { Project } from '../../models/gitlab';
import { Repository } from '../../models/github';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = '/api';

  constructor(private httpClient: HttpClient) { }

  @Cache({ ttl: 60 })
  public get(): Observable<UserData> {
    return this.httpClient.get<UserData>(`${this.API_URL}/user`, {withCredentials: true});
  }

  @Cache({ ttl: 3600 })
  public getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(`${this.API_URL}/projects`, {withCredentials: true});
  }

  @Cache({ ttl: 3600 })
  public getRepos(): Observable<Repository[]> {
    return this.httpClient.get<Repository[]>(`${this.API_URL}/repos`, {withCredentials: true});
  }
}
