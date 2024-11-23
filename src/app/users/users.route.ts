import { Routes } from '@angular/router';
import {
    canLeaveEditPage,
    NewTaskComponent,
} from '../tasks/new-task/new-task.component';
import {
    resolveTitle,
    resolveUserTasks,
    TasksComponent,
} from '../tasks/tasks.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'prefix',
  },
  {
    path: 'tasks',
    component: TasksComponent,
    runGuardsAndResolvers: 'always',
    resolve: {
      userTasks: resolveUserTasks,
    },
    title: resolveTitle,
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
    canDeactivate: [canLeaveEditPage],
  },
];