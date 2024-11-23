import { Component, inject, input } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterStateSnapshot,
} from '@angular/router';
import { resolveUserName } from '../users/user-tasks/user-tasks.component';
import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  userId = input.required<string>();
  // orderSignal = input<'Asc' | 'Desc'>();
  order = input<'asc' | 'desc' | undefined>();
  userTasks = input.required<Task[]>();

  // private taskService = inject(TasksService);
  // private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);

  // userTasks = computed(() =>
  //   this.taskService
  //     .allTasks()
  //     .filter((task) => task.userId === this.userId())
  //     .sort((a, b) => {
  //       if ('Desc' == this.order()) {
  //         return a.id > b.id ? -1 : 1;
  //       } else {
  //         return a.id > b.id ? 1 : -1;
  //       }
  //     })
  // );

  // ngOnInit(): void {
  //   const subcription = this.activatedRoute.queryParams.subscribe({
  //     next: (params) => {
  //       this.order.set(params['order']);
  //     },
  //   });
  //   this.destroyRef.onDestroy(() => {
  //     subcription.unsubscribe();
  //   });
  // }
}

export const resolveUserTasks: ResolveFn<Task[]> = (
  activateRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const taskService = inject(TasksService);
  const userId = activateRoute.paramMap.get('userId');
  const order = activateRoute.queryParams['order'];

  return taskService
    .allTasks()
    .filter((task) => task.userId === userId)
    .sort((a, b) => {
      if ('desc' == order) {
        return a.id > b.id ? -1 : 1;
      } else {
        return a.id > b.id ? 1 : -1;
      }
    });
};

export const resolveTitle: ResolveFn<string> = (
  activateRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  return resolveUserName(activateRoute, routerState) + '\'s Tasks';
};
