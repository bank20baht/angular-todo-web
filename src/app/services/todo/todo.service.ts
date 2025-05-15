import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AddTodoRequestBody, TodoResponse } from '@/types';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
	private readonly baseUrl: string = import.meta.env.NG_APP_IDENTITY_URL;
	private readonly endpoint = "v1/table-a";
	http = inject(HttpClient);
  
  addTodo(body: AddTodoRequestBody[]) : Observable<string>
  {
    return this.http.post(`${this.baseUrl}/${this.endpoint}`, body).pipe(
      map(() => {
        return "addTodo success";
      })
    );
  }

  getTodo() : Observable<TodoResponse[]>
  {
    return this.http.get<TodoResponse[]>(`${this.baseUrl}/${this.endpoint}`);
  }
}
