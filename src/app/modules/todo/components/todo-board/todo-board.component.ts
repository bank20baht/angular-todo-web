import { TodoService } from '@/services';
import { TodoType } from '@/types';
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
  listTodo: TodoType[] = [];
  todoService = inject(TodoService);

  todoStatus = [
    { name: 'PENDING', value: 'PENDING' },
    { name: 'DOING', value: 'DOING' },
    { name: 'COMPLETE', value: 'COMPLETE' },]

  handleClickAddButton() {
    const newTodo: TodoType = {
      title: '',
      status: 'PENDING',
  }
    this.listTodo.push(newTodo);    
  }

  submitTodoList() {
    this.todoService.addTodo(this.listTodo).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      }
    });
    this.getTodoList();
  }

  getTodoList() {
    this.todoService.getTodo().subscribe({
      next: (res) => {
        this.listTodo = [...res]; 
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnInit() {
    this.getTodoList();
  }

  removeTodo(index: number) {
    this.listTodo.splice(index, 1);
  }


}
