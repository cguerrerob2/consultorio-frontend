import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor() { }

  isOpen = false;

  toggleModal() {
    this.isOpen = !this.isOpen;
  }

}
