import { Component } from '@angular/core';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/* Set title for web pages */
export class AppComponent {
  title = 'uBooks';
}
