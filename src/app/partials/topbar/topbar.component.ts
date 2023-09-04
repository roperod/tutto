import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

  @Output() toggleDarkModeEvent = new EventEmitter<boolean>();

  darkMode:boolean = false;

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.toggleDarkModeEvent.emit(this.darkMode);
  }
}
