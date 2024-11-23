import {
  Component,
  computed,
  EventEmitter,
  input,
  Output,
} from "@angular/core";

import { RouterLink, RouterLinkActive } from "@angular/router";
import { type User } from "./user.model";

@Component({
  selector: "app-user",
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: "./user.component.html",
  styleUrl: "./user.component.css",
})
export class UserComponent {
  user = input.required<User>();
  @Output() selectProfile = new EventEmitter();

  imagePath = computed(() => "users/" + this.user().avatar);

  onProfileSelect() {
    this.selectProfile.emit(this.user());
  }
}
