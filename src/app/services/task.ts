import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root' // <-- Esto es vital para que Angular Standalone lo reconozca globalmente
})
export class TaskService {
  private tasks: Task[] = [
    { id: 1, title: 'Aprender Angular Standalone', description: 'Entender componentes independientes y servicios', completed: false },
    { id: 2, title: 'Configurar el entorno', description: 'Controlar rutas y codificación UTF-8', completed: true }
  ];

  constructor() {}

  // READ
  getTasks(): Task[] {
    return [...this.tasks];
  }

  // CREATE
  addTask(title: string, description: string): void {
    const newTask: Task = {
      id: this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1,
      title,
      description,
      completed: false
    };
    this.tasks.push(newTask);
  }

  // UPDATE
  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = { ...updatedTask };
    }
  }

  // DELETE
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }
}