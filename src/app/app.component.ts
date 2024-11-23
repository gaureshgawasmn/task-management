import { Component } from "@angular/core";

import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { User } from "./users/user/user.model";
import { UsersComponent } from "./users/users.component";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  imports: [HeaderComponent, UsersComponent, RouterOutlet],
})
export class AppComponent {
  selectedImage: string | undefined = undefined;

  onProfileClose() {
    this.selectedImage = undefined;
  }

  onProfileSelect(user: User) {
    this.selectedImage = "/users/" + user.avatar;
  }
}
