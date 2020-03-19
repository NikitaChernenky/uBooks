/* Import all modules, libraries and services. */
import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { BookGenresService } from 'src/app/services/book-genres.service';
import { AuthService } from 'src/app/services/auth.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { ActiveLinkService } from 'src/app/services/active-link.service';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-customer-my-books',
  templateUrl: './customer-my-books.component.html',
  styleUrls: ['./customer-my-books.component.css']
})

/* Module view using class. */
export class CustomerMyBooksComponent implements OnInit {

  /* Declaration of all variables. */
  books: any = [];
  allbooksid: any = [];
  bookgenres: any = [];
  currentUser: any = {};
  data: any = {};
  changingData: any = {};
  visibleForm: string = '';
6
  /* Using services. */
  constructor(private booksService: BooksService, private bookGenres: BookGenresService, private authService: AuthService, private router: Router, private activeLinkService: ActiveLinkService) {
    this.currentUser = this.authService.getSignedInUser();
    this.data.UserID = this.currentUser.UserID;
  }

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData();
    /* Reset drop-down list with book genres. */
    this.data.BookGenreID = 'none';
  }

  /* Load data to variable using services. */
  fetchData() {
    /* Load all data to variable using customers' service. */
    this.bookGenres.getAllBookGenres().subscribe(bookgenre => {
      this.bookgenres = bookgenre;
    },
      err => {
        console.log(err);
      });

    /* Load all data to variable using books service. */
    this.booksService.getAllBooks().subscribe(book => {
      /* Array of all book's ID. */
      this.allbooksid = book.map(book => book.BookID);
      /* Get all books by customer ID. */
      this.books = book.filter(book => book.UserID == this.data.UserID);
    },
      err => {
        console.log(err);
      });
  }

  /* Reset create form after button clicking. */
  resetCreateForm() {
    this.data = {};
    this.data.BookGenreID = 'none';
  }

  /* Reset update form after button clicking. */
  resetUpdateForm() {
    this.changingData = {};
  }

  /* Create a new book using service. Writing data to the table of database. */
  createBook() {
    /* Checking if data properties is not empty */
    if (this.data.ISBN && this.data.BookCover && this.data.BookTitle && this.data.BookAuthor && this.data.BookGenreID != 'none' && this.data.PublicationYear && this.data.BookOverview && this.data.Quantity >= 0 && this.data.Price) {
      /* Checking if there are some users with the same email address. */
      if (!this.books.find(book => (book.ISBN == this.data.ISBN && book.BookID != this.data.BookID) || (book.BookAuthor == this.data.BookAuthor && book.BookTitle == this.data.BookTitle && book.BookTitle == this.data.BookTitle && book.PublicationYear == this.data.PublicationYear && book.BookID != this.data.BookID))) {
        /* Add new data to the table of HTML-page. */
        let bookID = Math.max.apply(null, this.allbooksid) + 1;
        let book = {
          BookID: bookID,
          UserID: this.authService.getSignedInUser().UserID,
          ISBN: this.data.ISBN,
          BookCover: this.data.BookCover,
          BookTitle: this.data.BookTitle,
          BookAuthor: this.data.BookAuthor,
          BookGenreID: this.bookgenres.find(genre => genre.BookGenreID == this.data.BookGenreID).BookGenreID,
          BookGenre: this.bookgenres.find(genre => genre.BookGenreID == this.data.BookGenreID).BookGenre,
          PublicationYear: this.data.PublicationYear,
          BookOverview: this.data.BookOverview,
          Quantity: this.data.Quantity,
          Price: this.data.Price
        };
        this.books.push(book);
        this.allbooksid.push(bookID);
        /* INSERT query to the admins' table of the database */
        this.booksService.insertBook(book).subscribe(() => { this.fetchData(); });
        /* Hide adding form. */
        this.visibleForm = "";
      } else {
        alert('The same book exists!'); this.visibleForm = '';
      }
    } else {
      alert('Please, fill in all fields!'); this.visibleForm = '';
    }
  }

  /* Update book's data using a service. */
  updateBook() {
    /* Checking if data properties is not empty. */
    if (this.changingData.ISBN && this.changingData.BookCover && this.changingData.BookTitle && this.changingData.BookAuthor && this.changingData.BookGenreID != 'none' && this.changingData.PublicationYear && this.changingData.BookOverview && this.changingData.Quantity >= 0 && this.changingData.Price) {
      /* Checking if there is the same book in the database. */
      if (!this.books.find(book => (book.ISBN == this.changingData.ISBN && book.BookID != this.changingData.BookID) || (book.BookAuthor == this.changingData.BookAuthor && book.BookTitle == this.changingData.BookTitle && book.BookTitle == this.changingData.BookTitle && book.PublicationYear == this.changingData.PublicationYear && book.BookID != this.changingData.BookID))) {
        /* UPDATE query to the books table of the database */
        this.changingData.UserID = this.authService.getSignedInUser().UserID;
        this.booksService.updateBook(this.changingData).subscribe(() => { this.fetchData(); });
        /* Update book's data. */
        this.books.find(book => {
          if (book.BookID == this.changingData.BookID) {
            book.ISBN = this.changingData.ISBN;
            book.BookCover = this.changingData.BookCover;
            book.BookTitle = this.changingData.BookTitle;
            book.BookAuthor = this.changingData.BookAuthor;
            book.BookGenreID = this.bookgenres.find(genre => genre.BookGenreID == this.changingData.BookGenreID).BookGenreID;
            book.BookGenre = this.bookgenres.find(genre => genre.BookGenreID == this.changingData.BookGenreID).BookGenre;
            book.PublicationYear = this.changingData.PublicationYear;
            book.BookOverview = this.changingData.BookOverview;
            book.Quantity = this.changingData.Quantity;
            book.Price = this.changingData.Price;
          }
        });
        /* Hide updating form. */
        this.visibleForm = "";
      } else {
        alert('The same book exists!'); this.visibleForm = '';
      }
    } else {
      alert('Input or select fields must not be empty!'); this.visibleForm = '';
    }
  }

  /* Get data from form for updating user's data. */
  getBookForUpdate(id) {
    /* Get book by ID from the database. */
    this.booksService.getBookByID(id).subscribe(book => {
      this.changingData.BookID = book[0].BookID;
      this.changingData.UserID = book[0].UserID;
      this.changingData.ISBN = book[0].ISBN;
      this.changingData.BookCover = book[0].BookCover;
      this.changingData.BookTitle = book[0].BookTitle;
      this.changingData.BookAuthor = book[0].BookAuthor;
      this.changingData.BookGenreID = book[0].BookGenreID;
      this.changingData.PublicationYear = book[0].PublicationYear;
      this.changingData.BookOverview = book[0].BookOverview;
      this.changingData.Quantity = book[0].Quantity;
      this.changingData.Price = book[0].Price;
    },
      err => {
        console.log(err);
      });
  }

  /* Remove selected book from the table of database. */
  deleteBook(id) {
    /* DELETE query to the books table of the database */
    this.booksService.deleteBook(id).subscribe(() => { this.fetchData(); });
    /* Delete table entry by book's ID. */
    this.books = this.books.filter(book => book.BookID != id);
    /* Delete book's ID from array of all book's ID. */
    this.allbooksid = this.allbooksid.filter(bookid => bookid != id);
  }

  /* Check customer's card number availability. */
  cardNumberAvailability() {
    if (this.currentUser.CardNumber != '' && this.currentUser.CardNumber != null) {
      this.visibleForm = 'create';
    }
  }

  /* Open account page afte button clicking of modal window. */
  openAccountSettings() {
    this.activeLinkService.setCustomerActiveLink('account');
    this.router.navigate(['/customer/account']);
  }

  /* Get the name and format of image after clicking the "upload image" button. Form an image URL-link. */
  onSelectFile(event, action) {
    if (action == 'create') {
      if (event.target.files[0]) {
        this.data.BookCover = 'assets/img/' + event.target.files[0].name;
      } else {
        this.data.BookCover = '';
      }
    }
    if (action == 'update') {
      if (event.target.files[0]) {
        this.changingData.BookCover = 'assets/img/' + event.target.files[0].name;
      } else {
        this.changingData.BookCover = '';
      }
    }
  }
}
