// app.component.ts
import { Component } from '@angular/core';
import { LandingpageComponent } from './landingpage/landingpage.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [LandingpageComponent],
})
export class AppComponent {
  title = 'QuickCrave';
}
