import { Component, inject, input } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  userId = input.required<string>(); // this is using the mapping directly
  message = input<string>();
  userName = input<string>();

  // private userService = inject(UsersService);
  // userId = '';
  // private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);

  // ngOnInit(): void {
  //   console.log(`Message received: ${this.message()}`);
  //   console.log(this.activatedRoute);
  //   const subscription = this.activatedRoute.paramMap.subscribe({
  //     next: (paramMap) => {
  //       this.userName =
  //         this.userService.users.find(
  //           (user) => user.id === paramMap.get('userId')
  //         )?.name || '';
  //     },
  //   });
  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //   });
  // }

  // userName = computed(() =>
  //   this.userService.users.find((user) => user.id === this.userId())?.name
  // );
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const userService = inject(UsersService);
  const userName =
    userService.users.find(
      (user) => user.id === activatedRoute.paramMap.get('userId')
    )?.name || '';
  return userName;
};
