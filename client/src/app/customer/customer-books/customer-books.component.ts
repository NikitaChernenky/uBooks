/* Import all libraries and services. */
import { Component, OnInit, Renderer2 } from "@angular/core";
import { BooksService } from "src/app/services/books.service";
import { BookGenresService } from "src/app/services/book-genres.service";
import { Router } from "@angular/router";
import { CartService } from "src/app/services/cart.service";
import { CustomerHeaderComponent } from "../customer-header/customer-header.component";

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: "app-customer-books",
  templateUrl: "./customer-books.component.html",
  styleUrls: ["./customer-books.component.css"]
})

/* Module view using class. */
export class CustomerBooksComponent implements OnInit {
  /* Declaration of all variables. */
  books: any = [];
  bookgenres: any = [];
  booksdetails: any = [];
  sortingType: string;
  searchText: string = "";
  priceto: number;
  pricefrom: number;
  pricetomax: number;
  pricefrommin: number;
  cartquantity: number;

  /* Using services. */
  constructor(
    private booksService: BooksService,
    private bookGenres: BookGenresService,
    private router: Router,
    private cartService: CartService,
    private renderer: Renderer2
  ) {
    this.renderer.setStyle(document.body, 'background', 'white'); //apply background for the entire component
  }

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData();
    this.sortingType = "0";
    this.cartquantity = this.cartService.getQuantity();
  }

  /* Load data to variable using services. */
  fetchData() {
    /* Load all data to variable using book genres' service. */
    this.bookGenres.getAllBookGenres().subscribe(
      bookgenre => {
        this.bookgenres = bookgenre;
      },
      err => {
        console.log(err);
      }
    );

    /* Load all data to variable using books service. */
    this.booksService.getAllBooks().subscribe(
      book => {
        /* Get all books. */
        this.books = book;
        /* Get max value of price for filtering form. */
        this.pricetomax = this.priceto = Math.max.apply(
          Math,
          this.books.map(function(o) {
            return o.Price;
          })
        );
        /* Get min value of price for filtering form. */
        this.pricefrommin = this.pricefrom = Math.min.apply(
          Math,
          this.books.map(function(o) {
            return o.Price;
          })
        );
        /* Sort all books by book ID. */
        this.books.sort((a, b) => a.BookID - b.BookID);
      },
      err => {
        console.log(err);
      }
    );
  }

  /* Add a new book to customer's cart. */
  addBookToCart(id) {
    this.cartquantity++;
    this.cartService.setBooks(id);
  }

  /* Show book's details. */
  showBookDetails(id) {
    this.booksdetails = this.books.find(book => book.BookID == id);
  }

  /* Sorting book list. */
  changeSort() {
    if (this.sortingType == "0") {
      this.books.sort((a, b) => parseFloat(a.BookID) - parseFloat(b.BookID));
    } else if (this.sortingType == "1") {
      this.books.sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price));
    } else if (this.sortingType == "2") {
      this.books.sort((a, b) => parseFloat(b.Price) - parseFloat(a.Price));
    }
  }

  /* Search books by book's title or book's author. */
  searchBook() {
    if (this.searchText != "") {
      this.books = this.books.filter(book => {
        return (
          book.BookTitle.toLowerCase().includes(
            this.searchText.toLowerCase()
          ) ||
          book.BookAuthor.toLowerCase().includes(this.searchText.toLowerCase())
        );
      });
    }
  }

  /* Reset search results. Show all books. */
  resetSearch() {
    this.fetchData();
    this.searchText = "";
  }

  /* Check if bookgenres array contains book with its BookGenreID. */
  containsBookGenre(bookgenres, id) {
    let contains = bookgenres.filter(obj => obj.BookGenreID == id).length >= 1;
    return contains;
  }

  /* Using filter of data. */
  filter() {
    /* Get book genres which were checked. */
    let bookGenresForFilter = this.bookgenres.filter(
      genre => genre.checked == true
    );
    /* Filter books list by book genres. */
    this.books = this.books.filter(book =>
      this.containsBookGenre(bookGenresForFilter, book.BookGenreID)
    );
    /* Filter books list by book's price. */
    if (
      (this.pricefrom && this.priceto) ||
      (this.pricefrom == 0 && this.priceto)
    ) {
      if (
        this.pricefrom < 0 ||
        this.priceto < 0 ||
        this.pricefrom > this.priceto
      ) {
        return alert("Please, check your input price values!");
      } else {
        this.books = this.books
          .filter(elem => elem.Price >= this.pricefrom)
          .filter(elem => elem.Price <= this.priceto);
      }
    }
  }

  /* Reset filter results. Show all books. */
  resetFilter() {
    this.fetchData();
  }
}
