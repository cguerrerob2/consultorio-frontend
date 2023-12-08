import { Component } from '@angular/core';
import { SharedDataService } from 'src/@api/shared-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'consultorio-frontend';
  isAdmin = false;

  constructor(private sharedDataService: SharedDataService) {
    // Suscríbete al observable isAdmin$
    this.sharedDataService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }
}
