/* Import all libraries and services. */
import { Component, OnInit } from '@angular/core';
import { BookGenresService } from 'src/app/services/book-genres.service';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-admin-book-genres',
  templateUrl: './admin-book-genres.component.html',
  styleUrls: ['./admin-book-genres.component.css']
})

/* Module view using class. */
export class AdminBookGenresComponent implements OnInit {

  /* Declaration of all variables. */
  bookgenres: any = [];
  data: any = {};
  changingData: any = {};
  visibleForm: string = "";

  /* Using service. */
  constructor(private bookGenresService: BookGenresService) { }

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData();
  }

  /* Load data to variable using book genres service. */
  fetchData() {
    /* Load all data to variable using book genres service. */
    this.bookGenresService.getAllBookGenres().subscribe(bookgenre => {
      this.bookgenres = bookgenre;
    },
      err => {
        console.log(err);
      });
  }

  /* Reset create form after button clicking. */
  resetCreateForm() {
    this.data = {};
  }

  /* Reset update form after button clicking. */
  resetUpdateForm() {
    this.changingData = {};
  }

  /* Create a new book's genre using service. Writing data to the table of the database. */
  createBookGenre() {
    /* Checking if data property is not empty. */
    if (this.data.BookGenre) {
      /* Checking if there are some genres with the same name. */
      if (!this.bookgenres.find(bookgenre => bookgenre.BookGenre == this.data.BookGenre)) {
        /* Add new data to the table of HTML-page. */
        let bookgenre = {
          BookGenreID: this.bookgenres[this.bookgenres.length - 1].BookGenreID + 1,
          BookGenre: this.data.BookGenre
        };
        this.bookgenres.push(bookgenre);
        /* INSERT query to the book genres table of the database */
        this.bookGenresService.insertBookGenre(bookgenre).subscribe(() => { this.fetchData(); });
        /* Hide adding form. */
        this.visibleForm = "";
      } else {
        alert("Book genre with this name exists!"); this.visibleForm = "";
      }
    } else {
      alert("Input field must not be empty"); this.visibleForm = "";
    }
  }

  /* Update book's genre name using a service. */
  updateBookGenre() {
    /* Checking if data property is not empty. */
    if (this.changingData.BookGenre) {
      /* Checking if there are some genres with the same name. */
      if (!this.bookgenres.find(bookgenre => bookgenre.BookGenre == this.changingData.BookGenre && bookgenre.BookGenreID != this.changingData.BookGenreID)) {
        /* UPDATE query to the book genres table of the database */
        this.bookGenresService.updateBookGenre(this.changingData).subscribe(() => { this.fetchData(); });
        /* Update book's genre data. */
        for (let i = 0; i < this.bookgenres.length; i++) {
          if (this.changingData.BookGenreID == this.bookgenres[i].BookGenreID) {
            this.bookgenres[i].BookGenre = this.changingData.BookGenre;
          }
        }
        /* Hide updating form. */
        this.visibleForm = "";
      } else {
        alert("Book genre with this name exists!"); this.visibleForm = "";
      }
    } else {
      alert("Input field must not be empty!"); this.visibleForm = "";
    }
  }

  /* Get data from form for updating country data. */
  getBookGenreForUpdate(id) {
    /* Get book genre by ID from the database. */
    this.bookGenresService.getBookGenreByID(id).subscribe(bookgenre => {
      this.changingData.BookGenreID = bookgenre[0].BookGenreID;
      this.changingData.BookGenre = bookgenre[0].BookGenre;
    },
      err => {
        console.log(err);
      });
  }

  /* Remove selected genre from database table. */
  deleteBookGenre(id) {
    /* DELETE query to the bookgenres table of the database */
    this.bookGenresService.deleteBookGenre(id).subscribe(() => { this.fetchData(); });
    /* Delete table entry by book's genre ID. */
    this.bookgenres = this.bookgenres.filter(bookgenre => bookgenre.BookGenreID != id);
  }
}
