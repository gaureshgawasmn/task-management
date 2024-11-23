import { Component, EventEmitter, inject, Output } from "@angular/core";

import { UserComponent } from "./user/user.component";
import { User } from "./user/user.model";
import { UsersService } from "./users.service";

@Component({
  selector: "app-users",
  standalone: true,
  templateUrl: "./users.component.html",
  styleUrl: "./users.component.css",
  imports: [UserComponent],
})
export class UsersComponent {
  private usersService = inject(UsersService);
  users = this.usersService.users;
  @Output() selectProfile = new EventEmitter();

  onProfileSelect(user: User) {
    this.selectProfile.emit(user);
  }
}
