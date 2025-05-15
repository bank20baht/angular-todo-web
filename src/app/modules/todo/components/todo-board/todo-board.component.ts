import { TodoService } from '@/services';
import { AddTodoRequestBody } from '@/types';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-board',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-board.component.html',
  styleUrl: './todo-board.component.css'
})
export class TodoBoardComponent {
  listTodo: AddTodoRequestBody[] = [];
  todoService = inject(TodoService);

  todoStatus = [
    { name: 'PENDING', value: 'PENDING' },
    { name: 'DOING', value: 'DOING' },
    { name: 'COMPLETE', value: 'COMPLETE' },]

  handleClickAddButton() {
    const newTodo: AddTodoRequestBody = {
      title: '',
      status: 'PENDING',
  }
    this.listTodo.push(newTodo);    
  }

  removeTodo(index: number) {
    this.listTodo.splice(index, 1);
  }


}
