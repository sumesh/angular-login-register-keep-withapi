import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
     }

     public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    getUser() {
        return this.http.get<User>(`${environment.apiUrl}/user`);
    }
    
    updateuser(obj:User) {
        return this.http.post<User>(`${environment.apiUrl}/updateuser`,obj)
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.currentUserSubject.next(user);
            return user;
        }));;
    }
    
}