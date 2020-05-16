import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Category } from '../_models';

@Injectable({ providedIn: 'root' })
export class CategoryService { 

    constructor(private http: HttpClient) { 
     }

    get(id) {
        return this.http.get<Category>(`${environment.apiUrl}/api/categories/`+id);
    }

    getAll() {
        return this.http.get<Category[]>(`${environment.apiUrl}/api/categories`);
    }
    
    create(obj:Category) {
        return this.http.post<Category>(`${environment.apiUrl}/api/categories`,obj);;
    }
    update(id:number,obj:Category) {
        return this.http.put<Category>(`${environment.apiUrl}/api/categories/`+id,obj);;
    }

    delete(id:number) {
        return this.http.delete<Category>(`${environment.apiUrl}/api/categories/`+id);;
    }
    
}