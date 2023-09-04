import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tutto';
  darkMode:string = "";

  toggleDarkMode($event:boolean) {
    if ($event) {
      this.darkMode = "dark";
    } else {
      this.darkMode = "";
    }
  }
}
