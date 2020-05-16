import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Remainder } from '../_models';

@Injectable({ providedIn: 'root' })
export class RemainderService { 

    constructor(private http: HttpClient) { 
     }

    get(id) {
        return this.http.get<Remainder>(`${environment.apiUrl}/api/remainders/`+id);
    }

    getAll() {
        return this.http.get<Remainder[]>(`${environment.apiUrl}/api/remainders`);
    }
    
    create(obj:Remainder) {
        return this.http.post<Remainder>(`${environment.apiUrl}/api/remainders`,obj);;
    }
    update(id:number,obj:Remainder) {
        return this.http.put<Remainder>(`${environment.apiUrl}/api/remainders/`+id,obj);;
    }

    delete(id:number) {
        return this.http.delete<Remainder>(`${environment.apiUrl}/api/remainders/`+id);;
    }
    
}