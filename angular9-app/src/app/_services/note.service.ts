import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Note, NoteStatus } from '../_models';

@Injectable({ providedIn: 'root' })
export class NoteService { 

    constructor(private http: HttpClient) { 
     }

    get(id) {
        return this.http.get<Note>(`${environment.apiUrl}/api/notes/`+id);
    }

    getAll() {
        return this.http.get<Note[]>(`${environment.apiUrl}/api/notes`);
    }
    
    create(obj:Note) {
        return this.http.post<Note>(`${environment.apiUrl}/api/notes`,obj);;
    }
    update(id:number,obj:Note) {
        return this.http.put<Note>(`${environment.apiUrl}/api/notes/`+id,obj);;
    }

    delete(id:number) {
        return this.http.delete<Note>(`${environment.apiUrl}/api/notes/`+id);;
    }

    getNoteStatusAll() {
        return this.http.get<NoteStatus[]>(`${environment.apiUrl}/api/notestatuses`);
    }
    
}