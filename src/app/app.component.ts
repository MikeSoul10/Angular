import { Component, OnInit, inject } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from './services/task';
import { Task } from './models/task';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- Aquí declaramos las dependencias del componente
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  title = 'angular-crud-standalone';
  tasksList: Task[] = [];
  newTaskTitle: string = '';
  newTaskDescription: string = '';

  // En lugar de usar constructor(), usamos la función inject directamente:
  private taskService = inject(TaskService); 

  ngOnInit(): void {
    this.loadTasks();
  }

  // READ: Cargar tareas desde el servicio
  loadTasks(): void {
    this.tasksList = this.taskService.getTasks();
  }

  // CREATE: Guardar nueva tarea
  saveTask(): void {
    if (this.newTaskTitle.trim() === '') {
      alert('El título es obligatorio');
      return;
    }

    this.taskService.addTask(this.newTaskTitle, this.newTaskDescription);
    
    // Limpiamos los inputs
    this.newTaskTitle = '';
    this.newTaskDescription = '';
    
    // Recargamos la lista
    this.loadTasks();
  }

  // UPDATE: Cambiar el estado de la tarea (Pendiente/Completada)
  toggleCompletion(task: Task): void {
    task.completed = !task.completed;
    this.taskService.updateTask(task);
    this.loadTasks();
  }

  // DELETE: Eliminar una tarea por ID
  deleteTask(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      this.taskService.deleteTask(id);
      this.loadTasks();
    }
  }
}