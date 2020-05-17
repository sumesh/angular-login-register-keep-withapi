import { Category, Remainder,NoteStatus } from './index'; 
export class Note {
    noteId: number;
    name: string;
    description: string; 
    category:Category;
    remainder:Remainder;
    status:NoteStatus;
    categoryId: number;
    statusId: number;
    remainderId: number;
}