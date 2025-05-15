import { TodoService } from '@/services';
import { TodoType } from '@/types';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-board',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-board.component.html',
  styleUrl: './todo-board.component.css'
})
export class TodoBoardComponent {
  private todoService = inject(TodoService);

  listTodo = signal<TodoType[]>([]);

  readonly todoStatus = [
    { name: 'PENDING', value: 'PENDING' },
    { name: 'DOING', value: 'DOING' },
    { name: 'COMPLETE', value: 'COMPLETE' },
  ];

  constructor() {
    this.getTodoList();
  }

  handleClickAddButton() {
    const newTodo: TodoType = {
      title: '',
      status: 'PENDING',
    };
    this.listTodo.update(todos => [...todos, newTodo]);
  }

  submitTodoList() {
    this.todoService.addTodo(this.listTodo()).subscribe({
      next: (res) => {
        console.log(res);
        this.getTodoList(); 
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getTodoList() {
    this.todoService.getTodo().subscribe({
      next: (res) => {
        this.listTodo.set(res);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  removeTodo(index: number) {
    this.listTodo.update(todos => todos.filter((_, i) => i !== index));
  }

}
