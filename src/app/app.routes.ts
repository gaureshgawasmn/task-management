import { inject } from '@angular/core';
import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  resolveUserName,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import { routes as userRoutes } from './users/users.route';

export const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const number = Math.random();
  if (number < 1) {
    return true;
  }
  return new RedirectCommand(router.parseUrl('/unauthorized'));
};

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    title: 'No task selected',
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: userRoutes,
    canMatch: [dummyCanMatch],
    data: {
      message: 'Hello from route data!',
    },
    resolve: {
      userName: resolveUserName,
    },
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
