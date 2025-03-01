import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable(); // Observable for user state

  constructor() {
    this.loadUserFromSession();
  }

  private loadUserFromSession() {
    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username');
    const role = sessionStorage.getItem('role');

    if (token && username && role) {
      this.userSubject.next(new User(role, username, token));
    } else {
      this.userSubject.next(null);
    }
  }

  setLoginDetails(user: User) {
    sessionStorage.setItem('token', user.token);
    sessionStorage.setItem('username', user.username);
    sessionStorage.setItem('role', user.role);
    this.userSubject.next(user);
  }

  logout() {
    sessionStorage.clear();
    this.userSubject.next(null);
  }
}
