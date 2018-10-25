import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user';
import { USERS } from './mock-users';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'http://localhost:8081/api/user/listUsers'; // URL to web api
  private usersDelUrl = 'http://localhost:8081/api/user/deleteUser'; // URL to web api
  private usersAddUrl = 'http://localhost:8081/api/user/addUser';
  private usersUpdUrl = 'http://localhost:8081/api/user/editUser';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return of(USERS);
  }

  getUsersH(): Observable<User[]> {

    return this.http.get<User[]>(this.usersUrl);

  }

  deleteUser (user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.usersDelUrl}/${id}`;

    return this.http.delete<User>(url);
  }

  addUser (user: User): Observable<User> {
    return this.http.post<User>(this.usersAddUrl, user);
  }

  updateUser (user: User): Observable<any> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.usersUpdUrl}/${id}`;

    return this.http.post(url, user);
  }
}
