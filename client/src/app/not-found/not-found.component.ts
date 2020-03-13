/* Import all libraries. */
import { Component, OnInit } from '@angular/core';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})

/* Module view using class. */
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
